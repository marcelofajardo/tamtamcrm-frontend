<?php

namespace App\Http\Controllers;

use App\Requests\CommentRequest;
use App\Repositories\Interfaces\CommentRepositoryInterface;
use App\Repositories\Interfaces\TaskRepositoryInterface;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Notification;
use App\Notifications\CommentCreated;
use App\Repositories\CommentRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CommentController extends Controller
{

    /**
     * @var CommentRepositoryInterface
     */
    private $commentRepository;

    /**
     * @var TaskRepositoryInterface
     */
    private $taskRepository;

    /**
     * CommentController constructor.
     *
     * @param CommentRepositoryInterface $commentRepository
     * TaskRepositoryInterface $taskRepository
     */
    public function __construct(CommentRepositoryInterface $commentRepository, TaskRepositoryInterface $taskRepository)
    {
        $this->commentRepository = $commentRepository;
        $this->taskRepository = $taskRepository;
    }

    public function index($task_id)
    {

        $objTask = $this->taskRepository->findTaskById($task_id);
        $comments = $this->commentRepository->getAllCommentsForTask($objTask);
        return $comments->toJson();
    }

    /**
     *
     * @param CommentRequest $request
     * @return type
     */
    public function store(CommentRequest $request)
    {

        $validatedData = $request->validated();

        $user = Auth::user();

        $comment = $this->commentRepository->createComment([
            'parent_id' => !empty($validatedData['parent_id']) ? $validatedData['parent_id'] : 0,
            'comment' => $validatedData['comment'],
            'parent_type' => (int)!empty($validatedData['task_id']) ? 1 : 2,
            'user_id' => $user->id
        ]);
        if (!empty($validatedData['task_id'])) {
            $task = $this->taskRepository->findTaskById($validatedData['task_id']);
            $task->comments()->attach($comment);
        }

        $arrResponse[0] = $comment;
        $arrResponse[0]['user'] = $user->toArray();

        //send notification

        Notification::send($user, new CommentCreated($comment));

        return collect($arrResponse)->toJson();
    }

    /**
     *
     * @param int $id
     * @return type
     */
    public function destroy(int $id)
    {
        $comment = $this->commentRepository->findCommentById($id);
        $commentRepo = new CommentRepository($comment);
        $commentRepo->deleteComment();

        return response()->json('Comment deleted!');
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param int $id
     * @return Response
     */
    public function update(Request $request, $id)
    {
        $comment = $this->commentRepository->findCommentById($id);
        $update = new CommentRepository($comment);
        $update->updateComment($request->all());
        return response()->json('Comment updated!');
    }

}
