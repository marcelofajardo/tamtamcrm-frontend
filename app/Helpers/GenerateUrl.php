<?php

use App\File;
use Illuminate\Support\Facades\Storage;

/**
 * Generate url for the asset.
 *
 * @param Document $document
 * @param boolean $absolute
 * @return string|null
 */
function generateUrl(File $document, $absolute = false)
{
    $url = Storage::disk($document->disk)->url($document->path);

    if($url && $absolute) return url($url);

    if ($url) return $url;

    return null;
}
