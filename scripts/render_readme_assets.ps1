$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $PSScriptRoot
$screenshots = Join-Path $root "screenshots"
New-Item -ItemType Directory -Force -Path $screenshots | Out-Null
Get-ChildItem -Path $screenshots -File -ErrorAction SilentlyContinue | Remove-Item -Force

Add-Type -AssemblyName System.Drawing

function New-ProofImage {
  param(
    [string]$Title,
    [string]$Subtitle,
    [string[]]$Bullets,
    [string]$OutputPath
  )

  $width = 1600
  $height = 900
  $bmp = New-Object System.Drawing.Bitmap($width, $height)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode = "AntiAlias"
  $bg = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(7,10,15))
  $panelPen = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(60, 120, 255, 170), 2)
  $textBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(233,243,255))
  $mutedBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(186,200,218))
  $accentBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(55,255,139))
  $dotBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(25,199,255))
  $fontTitle = New-Object System.Drawing.Font("Georgia", 30, [System.Drawing.FontStyle]::Bold)
  $fontSub = New-Object System.Drawing.Font("Segoe UI", 16)
  $fontBody = New-Object System.Drawing.Font("Segoe UI", 14)

  $g.FillRectangle($bg, 0, 0, $width, $height)
  $rect = New-Object System.Drawing.Rectangle(40, 40, 1520, 820)
  $g.DrawRectangle($panelPen, $rect)
  $g.DrawString("Governance Registry", $fontSub, $accentBrush, 70, 85)
  $g.DrawString($Title, $fontTitle, $textBrush, 70, 135)
  $subtitleRect = New-Object System.Drawing.RectangleF(70, 220, 1400, 80)
  $g.DrawString($Subtitle, $fontSub, $mutedBrush, $subtitleRect)

  $y = 320
  foreach ($bullet in $Bullets) {
    $g.FillEllipse($dotBrush, 85, $y + 8, 10, 10)
    $bulletRect = New-Object System.Drawing.RectangleF(110, $y, 1320, 48)
    $g.DrawString($bullet, $fontBody, $textBrush, $bulletRect)
    $y += 72
  }

  $g.DrawString("Synthetic proof render for README packaging.", $fontSub, $mutedBrush, 70, 800)
  $bmp.Save($OutputPath, [System.Drawing.Imaging.ImageFormat]::Png)
  $g.Dispose()
  $bmp.Dispose()
}

New-ProofImage -Title "Registry snapshot for the executive operating layer" -Subtitle "One software-layer control surface for systems, owners, evidence packets, open decisions, and investment queue." -Bullets @(
  "The overview keeps score, benchmark gap, stale evidence, and investment queue in one board-readable registry.",
  "Leadership can see which systems are locked, which are still open, and where accountability still needs cleanup.",
  "This surface exists after scorecards, briefs, and diligence packs - not instead of them."
) -OutputPath (Join-Path $screenshots "01-overview-proof.png")

New-ProofImage -Title "Registry lane keeps owners and board questions aligned" -Subtitle "Every system retains its owner, decision state, evidence status, and next action." -Bullets @(
  "The lane makes it clear who owns the next packet and which question still belongs in the board sequence.",
  "Open and in-progress decisions stay visible instead of disappearing into presentation copy.",
  "Evidence state remains attached to the operating owner."
) -OutputPath (Join-Path $screenshots "02-registry-lane-proof.png")

New-ProofImage -Title "Evidence objects tie live proof back to the registry" -Subtitle "Proof packets, live surfaces, and company signals stay visible in one place." -Bullets @(
  "This view turns scorecards and briefs into reusable operating evidence.",
  "Leadership can trace live domains, named companies, and packet contents without jumping between products.",
  "The registry acts as the source of truth for board-safe proof."
) -OutputPath (Join-Path $screenshots "03-evidence-objects-proof.png")

New-ProofImage -Title "Decision journal keeps the investment sequence readable" -Subtitle "Latest decision, review date, and next action stay in one journal." -Bullets @(
  "Board and investor asks stay linked to the system that generated them.",
  "Review cadence, benchmark, and next action remain visible together.",
  "This creates a repeatable executive operating loop instead of disconnected memos."
) -OutputPath (Join-Path $screenshots "04-decision-journal-proof.png")
