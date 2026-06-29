Add-Type -AssemblyName System.Drawing

$bmp = New-Object System.Drawing.Bitmap(256, 256)
$gfx = [System.Drawing.Graphics]::FromImage($bmp)
$gfx.SmoothingMode = 'AntiAlias'
$gfx.TextRenderingHint = 'AntiAlias'
$gfx.Clear([System.Drawing.Color]::FromArgb(255, 30, 30, 46))

# Draw hexagon
$cx = 128; $cy = 128; $r = 100
$pts = 0..5 | ForEach-Object {
    $a = [Math]::PI / 180 * (60 * $_ - 30)
    New-Object System.Drawing.PointF(($cx + $r * [Math]::Cos($a)), ($cy + $r * [Math]::Sin($a)))
}
$brush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 137, 180, 250))
$gfx.FillPolygon($brush, [System.Drawing.PointF[]]$pts)

# Draw letter B
$font = New-Object System.Drawing.Font('Arial', 96, [System.Drawing.FontStyle]::Bold)
$tb = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 30, 30, 46))
$sf = New-Object System.Drawing.StringFormat
$sf.Alignment = [System.Drawing.StringAlignment]::Center
$sf.LineAlignment = [System.Drawing.StringAlignment]::Center
$rect = New-Object System.Drawing.RectangleF(0, 0, 256, 256)
$gfx.DrawString('B', $font, $tb, $rect, $sf)
$gfx.Dispose()

# Save PNG
$pngPath = "$PSScriptRoot\icon256.png"
$bmp.Save($pngPath, [System.Drawing.Imaging.ImageFormat]::Png)

# Wrap PNG in ICO format
$pngBytes = [System.IO.File]::ReadAllBytes($pngPath)
$ms = New-Object System.IO.MemoryStream
$bw = New-Object System.IO.BinaryWriter($ms)
$bw.Write([uint16]0)   # reserved
$bw.Write([uint16]1)   # type icon
$bw.Write([uint16]1)   # 1 image
# directory entry
$bw.Write([byte]0)     # width 256
$bw.Write([byte]0)     # height 256
$bw.Write([byte]0)     # colors
$bw.Write([byte]0)     # reserved
$bw.Write([uint16]1)   # planes
$bw.Write([uint16]32)  # bpp
$bw.Write([uint32]$pngBytes.Length)
$bw.Write([uint32]22)  # data offset
$bw.Write($pngBytes)
$bw.Flush()

$icoPath = "$PSScriptRoot\icon.ico"
[System.IO.File]::WriteAllBytes($icoPath, $ms.ToArray())
Write-Host "Done: $icoPath ($((Get-Item $icoPath).Length) bytes)"
