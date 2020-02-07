<?php
namespace App\Transformations;
use App\File;

trait FileTransformable
{
    /**
     * Transform the department
     *
     * @param Department $department
     * @return Department
     */
    protected function transformFile(File $document)
    {
        $prop = new File;
        
         $prop->id = $document->id;
         $prop->user_id = $document->user_id;
         $prop->assigned_user_id = $document->assigned_user_id;
         $prop->task_id = $document->task_id;
         $prop->company_id = $document->company_id;
         $prop->file_path = (string) $document->path ?: '';
         $prop->preview = (string) $document->preview ?: '';
         $prop->name = (string) $document->name;
         $prop->type = (string) $document->type;
         $prop->disk = (string) $document->disk;
         $prop->hash = (string) $document->hash;
         $prop->size = (int) $document->size;
         $prop->width = (int) $document->width;
         $prop->height = (int) $document->height;
         $prop->is_default = (bool) $document->is_default;
         $prop->updated_at = (int) $document->updated_at;
         $prop->archived_at = (int) $document->archived_at;

        return $prop;
    }
}
