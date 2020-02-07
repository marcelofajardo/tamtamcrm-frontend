<?php
namespace App\Http\Controllers;

use App\Factory\GroupSettingFactory;
use App\Filters\GroupSettingFilter;
use App\Requests\GroupSetting\StoreGroupSettingRequest;
use App\Requests\GroupSetting\UpdateGroupSettingRequest;
use App\GroupSetting;
use App\Repositories\GroupSettingRepository;
use App\Requests\SearchRequest;
use App\Transformations\GroupSettingTransformable;
use App\Traits\UploadableTrait;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Http\Request;

class GroupSettingController extends Controller
{
    use DispatchesJobs;
    use UploadableTrait;
    use GroupSettingTransformable;

    protected $group_setting_repo;

    /**
     * GroupSettingController constructor.
     * @param GroupSettingRepository $group_setting_repo
     */
    public function __construct(GroupSettingRepository $group_setting_repo)
    {
        $this->group_setting_repo = $group_setting_repo;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     *
     *
     *
     */
    public function index(SearchRequest $request)
    {
        $group_settings = (new GroupSettingFilter($this->group_setting_repo))->filter($request,
            auth()->user()->account_user()->account_id);

        return response()->json($group_settings);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\SignupRequest $request
     * @return \Illuminate\Http\Response
     *
     *
     */
    public function store(StoreGroupSettingRequest $request)
    {
        //need to be careful here as we may also receive some
        //supporting attributes such as logo which need to be handled outside of the
        //settings object
        $group_setting = GroupSettingFactory::create(auth()->user()->account_user()->account_id, auth()->user()->id);
        $group_setting = $this->group_setting_repo->save($request->all(), $group_setting);

        $this->uploadLogo($request->file('company_logo'), $group_setting->company, $group_setting);
        return response()->json($this->transformGroupSetting($group_setting));
    }

    /**
     * Display the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     *
     */
    public function show(ShowGroupSettingRequest $request, GroupSetting $group_setting)
    {
        return response()->json($this->transformGroupSetting($group_setting));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  int $id
     * @return \Illuminate\Http\Response
     *
     *
     */
    public function update(int $id, UpdateGroupSettingRequest $request)
    {
       $group_setting = $this->group_setting_repo->findGroupSettingById($id);
        $group_setting = $this->group_setting_repo->save($request->all(), $group_setting);

        $this->uploadLogo($request->file('company_logo'), $group_setting->company, $group_setting);
        return response()->json($this->transformGroupSetting($group_setting));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int $id
     *
     * @return \Illuminate\Http\Response
     */
    public function archive(int $id)
    {
        $group_setting = $this->group_setting_repo->findGroupSettingById($id);
        $group_setting->delete();
        return response()->json([], 200);
    }

    /**
     * @param int $id
     * @return mixed
     */
    public function destroy(int $id)
    {
        $tax_rate = GroupSetting::withTrashed()->where('id', '=', $id)->first();
        $this->group_setting_repo->newDelete($tax_rate);
        return response()->json([], 200);
    }

    /**
     * @param Request $request
     * @return mixed
     */
    public function filterGroups(Request $request)
    {
        $quotes = (new GroupSettingFilter($this->group_setting_repo))->filterBySearchCriteria($request->all(),
            auth()->user()->account_user()->account_id);
        return response()->json($quotes);
    }

    /**
     * @param int $id
     * @return mixed
     */
    public function restore(int $id) {
        $group = GroupSetting::withTrashed()->where('id', '=', $id)->first();
        $this->group_setting_repo->restore($group);
        return response()->json([], 200);
    }
}
