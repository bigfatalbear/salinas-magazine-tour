Add-Type -AssemblyName System.Drawing

$outDir = Join-Path $PSScriptRoot '..\public\icons'
New-Item -ItemType Directory -Force -Path $outDir | Out-Null

function New-BrandIcon {
  param([int]$Size, [string]$OutFile, [double]$Inset = 0)

  $bmp = New-Object System.Drawing.Bitmap($Size, $Size)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias

  $deep = [System.Drawing.Color]::FromArgb(10, 54, 86)
  $turq = [System.Drawing.Color]::FromArgb(0, 139, 158)
  $coral = [System.Drawing.Color]::FromArgb(224, 90, 71)
  $sand = [System.Drawing.Color]::FromArgb(230, 194, 122)

  $g.Clear($deep)

  $pad = [double]$Size * $Inset
  $w = [double]$Size - (2 * $pad)
  $x = [double]$pad
  $y = [double]$pad

  $sunBrush = New-Object System.Drawing.SolidBrush($coral)
  $sunD = [int]($w * 0.24)
  $g.FillEllipse($sunBrush, [int]($x + $w * 0.54), [int]($y + $w * 0.12), $sunD, $sunD)

  $penTurq = New-Object System.Drawing.Pen($turq, [single]($Size * 0.055))
  $penTurq.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
  $penTurq.EndCap = [System.Drawing.Drawing2D.LineCap]::Round
  $g.DrawArc($penTurq, [single]($x + $w * 0.10), [single]($y + $w * 0.46), [single]($w * 0.80), [single]($w * 0.34), 200, 140)
  $g.DrawArc($penTurq, [single]($x + $w * 0.10), [single]($y + $w * 0.62), [single]($w * 0.80), [single]($w * 0.30), 200, 140)

  $penSand = New-Object System.Drawing.Pen($sand, [single]($Size * 0.045))
  $penSand.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
  $penSand.EndCap = [System.Drawing.Drawing2D.LineCap]::Round
  $g.DrawArc($penSand, [single]($x + $w * 0.14), [single]($y + $w * 0.74), [single]($w * 0.72), [single]($w * 0.24), 200, 140)

  $g.Dispose()
  $bmp.Save($OutFile, [System.Drawing.Imaging.ImageFormat]::Png)
  $bmp.Dispose()
}

New-BrandIcon -Size 192 -OutFile (Join-Path $outDir 'icon-192.png')
New-BrandIcon -Size 512 -OutFile (Join-Path $outDir 'icon-512.png')
New-BrandIcon -Size 512 -OutFile (Join-Path $outDir 'maskable-512.png') -Inset 0.12
New-BrandIcon -Size 180 -OutFile (Join-Path $outDir 'apple-touch-icon.png')
New-BrandIcon -Size 64 -OutFile (Join-Path $outDir 'favicon-64.png')

Write-Output 'Icons generated.'
