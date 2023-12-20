# Set the path to your files
$filesPath = "E:\wamp64\www\portfolio\src\img"

# Initialize an array to store JSON objects
$jsonObjects = @()

# Get all files in the specified path
$files = Get-ChildItem -Path $filesPath

# Loop through each file
foreach ($file in $files) {
    # Extract information from the file name based on the pattern
    if ($file.Name -match "thumbnail") {
        $thumbnailName = $file.Name
        $hdName = $file.Name -replace '^thumbnail', 'hd'
    }
    else {
        # Skip files with unrecognized patterns
        continue
    }

    # Add a JSON object to the array
    $jsonObject = @{
        "name" = $file.BaseName -replace '^thumbnail-', ''
        "thumbnail_name" = $thumbnailName
        "hd_name" = $hdName
        "project_description" = "Manually added description for $($file.Name)"
    }

    # Add the JSON object to the array
    $jsonObjects += $jsonObject
}

# Convert the array to JSON format
$jsonContent = $jsonObjects | ConvertTo-Json -Depth 5

# Save the JSON content to a file
$jsonContent | Set-Content -Path "output.json"