<?php

namespace App\Listeners\Document;

use App\Events\Account\AccountWasDeleted;
use App\File;
use Illuminate\Filesystem\Filesystem;

class DeleteAccountDocuments
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param CompanyWasDeleted $event
     * @return void
     */
    public function handle(AccountWasDeleted $event)
    {
        $path = sprintf('%s/%s', storage_path('app/public'), $event->account->id);

        // Remove all files & folders, under company's path.
        // This will delete directory itself, as well.
        // In case we want to remove the content of folder, we should use $fs->cleanDirectory();
        $filesystem = new Filesystem();
        $filesystem->deleteDirectory($path);

        File::whereAccountId($event->account->id)->delete();
    }
}
