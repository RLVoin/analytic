import {Form, Modal} from "antd";

export default function ModalChart(props) {

    const handleModalCancel = () => {
        props.setIsModalOpen(false);
    }

    const handleOptionOk = () => {
        props.setIsModalOpen(false)
    }

    return(
        <Modal title="Опции" width={600} open={props.isModalOpen} onOk={handleOptionOk} onCancel={handleModalCancel}>
            <Form>

            </Form>
        </Modal>
    )
}