import React, {Component} from 'react'


class CourseDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            fee: '',
            description: '',
        }
    }

    render() {
        const {title, fee, description} = this.state;

        return (
            <div>
                <h1>New Course</h1>
                <form>
                    <div>
                        <label>Title</label>
                        <input value={title}/>
                    </div>
                    <div>
                        <select>
                            <option>--select--</option>
                        </select>
                    </div>
                </form>
            </div>
        );
    }

}