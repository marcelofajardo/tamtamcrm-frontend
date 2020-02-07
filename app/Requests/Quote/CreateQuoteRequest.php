<?php

namespace App\Requests\Quote;

use Illuminate\Foundation\Http\FormRequest;
use App\Traits\CleanLineItems;

class CreateQuoteRequest extends FormRequest
{
    use CleanLineItems;

    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {

        return [
            'customer_id' => 'required',
            'date' => 'required',
            'due_date' => 'required'
        ];
    }

    protected function prepareForValidation()
    {
        $input = $this->all();
        $input['line_items'] = isset($input['line_items']) ? $this->cleanItems($input['line_items']) : [];
        $this->replace($input);
    }

    /**
     * Custom message for validation
     *
     * @return array
     */
    public function messages()
    {
        return [
            'comment.required' => 'You must enter a comment!',
            'task_id.required' => 'There was an unexpected error!',
            'user_id.required' => 'There was an unexpected error!',
        ];
    }
}
