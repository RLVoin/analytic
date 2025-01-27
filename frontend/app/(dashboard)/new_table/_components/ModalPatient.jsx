import {Modal, Descriptions} from 'antd'

export default function ModalPatient(props) {
    const items = [
        {
            key: '1',
            label: 'Пациент',
            children: '1',
            span: 3
        },
        {
            key: '2',
            label: 'Возраст',
            children: '35',
            span: 3
        },
        {
            key: '3',
            label: 'Дата смерти',
            children: '10.10.2020',
            span: 2
        },
        {
            key: '4',
            label: 'Причина смерти',
            children: 'ASD',
            span: 2
        }
    ]

    return (
        <Modal className="max-h-[500px] h-full !w-[700px]"
               footer={[]}
               closable={false}
               open={props.isModalOpen} onOk={props.okHandler} onCancel={props.cancelHandler}>
            <Descriptions bordered items={items}/>
        </Modal>
    )
}