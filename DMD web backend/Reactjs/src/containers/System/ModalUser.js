import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { emitter } from "../../utils/emitter";




class ModalUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            MatKhau: '',
            Ho: '',
            Ten: '',
            DiaChi: ''
        }
        this.listenToEmitter();
    }
    listenToEmitter() {
        emitter.on('EVENT_CLEAR_MODAL_DATA', () => {
            this.setState({
                email: '',
                MatKhau: '',
                Ho: '',
                Ten: '',
                DiaChi: ''
            })
        })
    }
    componentDidMount() {

    }
    toggle = () => {
        this.props.toggleFromParent();
    }
    handleOnChangeInput = (event, id) => {
        let copyState = { ...this.state };
        copyState[id] = event.target.value;

        this.setState({
            ...copyState
        });
    }
    checkValideInput = () => {
        let isValid = true;
        let arrInput = ['email', 'MatKhau', 'Ho', 'Ten', 'DiaChi'];
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false;
                alert('Missing parameter: ' + arrInput[i]);
                break;
            }
        }
        return isValid;
    }
    handleAddNewUser = () => {
        let isValid = this.checkValideInput();
        if (isValid == true) {
            this.props.createNewUser(this.state);
        }
    }

    render() {

        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => { this.toggle() }}
                className={'modal-user-container'}
                size="lg"
            >
                <ModalHeader toggle={() => { this.toggle() }}>Tạo người dùng mới</ModalHeader>
                <ModalBody>
                    <div className="modal-user-body">
                        <div className="input-container">
                            <label>Email</label>
                            <input
                                type="text"
                                onChange={(event) => { this.handleOnChangeInput(event, "email") }}
                                value={this.state.email}
                            ></input>
                        </div>
                        <div className="input-container">
                            <label>Mật khẩu</label>
                            <input
                                type="password"
                                onChange={(event) => { this.handleOnChangeInput(event, "MatKhau") }}
                                value={this.state.MatKhau}
                            ></input>
                        </div>
                        <div className="input-container" >
                            <label>Họ</label>
                            <input
                                type="text"
                                onChange={(event) => { this.handleOnChangeInput(event, "Ho") }}
                                value={this.state.Ho}
                            ></input>
                        </div>
                        <div className="input-container" >
                            <label>Tên</label>
                            <input
                                type="text"
                                onChange={(event) => { this.handleOnChangeInput(event, "Ten") }}
                                value={this.state.Ten}
                            ></input>
                        </div>
                        <div className="input-container max-width-input" >
                            <label>Địa chỉ</label >
                            <input
                                type="text"
                                onChange={(event) => { this.handleOnChangeInput(event, "DiaChi") }}
                                value={this.state.DiaChi}
                            ></input>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary"
                        className="px-3"
                        onClick={() => { this.handleAddNewUser() }}
                    >Thêm mới</Button>{''}
                    <Button color="secondary" className="px-3" onClick={() => { this.toggle() }}>Đóng</Button>
                </ModalFooter>
            </Modal>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);




