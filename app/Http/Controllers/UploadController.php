<?php

namespace App\Http\Controllers;

use App\Invoice;
use App\Jobs\Utils\UploadFile;
use App\Repositories\TaskRepository;
use App\Requests\UploadRequest;
use App\Repositories\Interfaces\FileRepositoryInterface;
use App\Repositories\Interfaces\TaskRepositoryInterface;
use App\Repositories\UserRepository;
use App\Repositories\FileRepository;
use App\Task;
use App\User;
use Illuminate\Support\Facades\Notification;
use App\Notifications\AttachmentCreated;
use Illuminate\Support\Facades\Auth;

class UploadController extends Controller
{

    private $fileRepository;
    private $taskRepository;

    public function __construct(FileRepositoryInterface $fileRepository, TaskRepositoryInterface $taskRepository)
    {
        $this->fileRepository = $fileRepository;
        $this->taskRepository = $taskRepository;
    }

    public function index($entity, $task_id)
    {
        $entity = $entity === '1' ? Invoice::find($task_id) : Task::find($task_id);

        $uploads = $this->fileRepository->getFilesForEntity($entity);

        return $uploads->toJson();
    }

    /**
     * @param UploadRequest $request
     * @return mixed
     */
    public function store(UploadRequest $request)
    {
        $model_name = $request->entity_type;
        $obj = $model_name::where('id', $request->entity_id)->first();
        $user = Auth::user();
        $account = auth()->user()->account_user();
        $arrAddedFiles = [];

        if ($request->hasFile('file')) {
            foreach ($request->file('file') as $count => $file) {
                $file = UploadFile::dispatchNow($file, UploadFile::IMAGE, $user, $account, $obj);

                $arrAddedFiles[$count] = $file;
                $arrAddedFiles[$count]['user'] = $user->toArray();
            }

            return collect($arrAddedFiles)->toJson();
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int $id
     *
     * @return \Illuminate\Http\Response
     * @throws \Exception
     */
    public function destroy($id)
    {

        $file = $this->fileRepository->findFileById($id);
        $fileRepo = new FileRepository($file);
        $fileRepo->deleteFile();
        return response()->json('File deleted!');
    }
}
