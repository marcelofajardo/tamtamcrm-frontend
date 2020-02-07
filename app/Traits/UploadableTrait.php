<?php

namespace App\Traits;

use Illuminate\Http\UploadedFile;
use App\Jobs\Utils\UploadAvatar;

trait UploadableTrait
{

    /**
     * Upload a single file in the server
     *
     * @param UploadedFile $file
     * @param null $folder
     * @param string $disk
     * @param null $filename
     * @return false|string
     */
    public function uploadOne(UploadedFile $file, $folder = null, $disk = 'public', $filename = null)
    {
        $name = !is_null($filename) ? $filename : str_random(25);
        return $file->storeAs(
            $folder, $name . "." . $file->getClientOriginalExtension(), $disk
        );
    }

    /**
     * @param UploadedFile $file
     *
     * @param string $folder
     * @param string $disk
     *
     * @return false|string
     */
    public function storeFile(UploadedFile $file, $folder = 'products', $disk = 'public')
    {
        return $file->store($folder, ['disk' => $disk]);
    }

    public function uploadLogo($file, $account, $entity)
    {
        if ($file) {
            $path = UploadAvatar::dispatchNow($file, $account->id);

            if($path){
                $settings = $entity->settings;
                $settings->company_logo = $path;
                $entity->settings = $settings;
                $entity->save();
            }
        }
    }
}
