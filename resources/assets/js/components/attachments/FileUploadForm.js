import React, { Component } from 'react'
import axios from 'axios'
import { Progress } from 'reactstrap'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './uploads.scss'

class FileUpload extends Component {
    constructor (props) {
        super(props)
        this.state = {
            selectedFile: [],
            loaded: 0
        }
    }

    checkFileSize (event) {
        const files = event.target.files
        const size = 2000000
        const err = []
        for (var x = 0; x < files.length; x++) {
            if (files[x].size > size) {
                err[x] = files[x].type + 'is too large, please pick a smaller file\n'
            }
        }
        for (let z = 0; z < err.length; z++) {
            toast.error(err[z])
            event.target.value = null
        }
        return true
    }

    checkMimeType (event) {
        const files = event.target.files
        const err = []
        const types = ['image/png', 'image/jpeg', 'image/gif']
        for (let x = 0; x < files.length; x++) {
            if (types.every(type => files[x].type !== type)) {
                err[x] = files[x].type + ' is not a supported format\n'
            }
        }
        for (var z = 0; z < err.length; z++) {
            toast.error(err[z])
            event.target.value = null
        }
        return true
    }

    maxSelectFile (event) {
        const files = event.target.files
        if (files.length > 3) {
            const msg = 'Only 3 images can be uploaded at a time'
            event.target.value = null
            toast.warn(msg)
            return false
        }
        return true
    }

    onChangeHandler (event) {
        const files = event.target.files
        if (this.maxSelectFile(event) && this.checkMimeType(event) && this.checkFileSize(event)) {
            console.log('selected files', files)
            // if return true allow to setState
            this.setState({
                selectedFile: files,
                loaded: 0
            })
        }
    }

    onClickHandler () {
        const data = new FormData()
        data.append('user_id', this.props.user_id)
        data.append('entity_id', this.props.entity.id)
        data.append('entity_type', this.props.entity_type)
        for (var x = 0; x < this.state.selectedFile.length; x++) {
            data.append('file[]', this.state.selectedFile[x])
        }
        axios.post('/api/uploads', data, {
            onUploadProgress: ProgressEvent => {
                this.setState({
                    loaded: (ProgressEvent.loaded / ProgressEvent.total * 100)
                })
            }
        })
            .then(response => { // then print response status
                if (response.data && response.data.length) {
                    response.data.map((file, index) => (
                        this.props.addFile(file)
                    ))
                }
                toast.success('upload success')
            })
            .catch(err => { // then print response status
                console.warn(err)
                toast.error('upload fail')
            })
    }

    render () {
        const file_list = []

        if (this.state.selectedFile.length) {
            Array.from(this.state.selectedFile).forEach(file => {
                file_list.push(
                    <div key={file.name} className="Row">
                        <span className="Filename">{file.name}</span>
                    </div>
                )
            })
        }

        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="form-group files">
                            <span className="btn btn-default btn-file img-select-btn">
                                <span>Browse</span>
                                <input type="file" multiple name="img-file-input"
                                    onChange={this.onChangeHandler.bind(this)}/>
                            </span>

                            <button type="button" className="btn btn-success btn-block col-4 pull-right"
                                onClick={this.onClickHandler.bind(this)}>Upload
                            </button>
                        </div>

                        <div className="form-group">
                            <ToastContainer/>
                            <Progress max="100" color="success"
                                value={this.state.loaded}>{Math.round(this.state.loaded, 2)}%</Progress>
                        </div>

                        <div className="Files">
                            {file_list}
                        </div>

                        <hr className="mt-2 mb-5"/>
                    </div>
                </div>
            </div>
        )
    }
}

export default FileUpload
