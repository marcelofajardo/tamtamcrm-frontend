<?php

namespace App\Traits;

/**
 * Class ChecksEntityStatus
 * @package App\Traits
 */
trait CheckEntityStatus
{

    public function entityIsDeleted($entity)
    {

        return $entity->is_deleted;

    }

    public function disallowUpdate()
    {
        return response()->json(['message' => 'Record is deleted and cannot be edited. Restore the record to enable editing'],
            400);

    }

}
