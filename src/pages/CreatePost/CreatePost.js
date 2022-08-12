import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useForm, Controller } from 'react-hook-form';
import React from 'react';
import request from '../../api/request'


function CreatePost() {

    const [file, setFile] = React.useState();



    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            title: '',
            description: '',
            image: ''
        }
    });

    const uploadFile = async (file) => {
        const formData = new FormData();
        formData.append('file', file)

        try {
            const res = await request({
                url: '/api/upload',
                data: formData,
                method: 'POST'
            })
            // console.log('daylares', res.data.data.url)
            return res.data.data.url
        } catch (error) {
            return ''
        }
    }

    const onChangeFile = e => {
        const files = e.target.files
        if (files.length) {
            setFile(files[0])
        }
    }

    const onSubmit = async values => {  //khi submit cái upload thì tạo luôn 1 post mới

        if (file) {
            const imageUrl = await uploadFile(file);
            try {
                const res = await request({
                    url: '/api/posts',
                    method: 'POST',
                    data: {
                        imageUrl,
                        title:values.title,
                        description:values.description
                    }
                })
                if(res.data.success){
                    alert('Success');
                }
            } catch (error) {

            }
        }
    };


    return (
        <div>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Title</Form.Label>
                    <Controller
                        name="title"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                            <Form.Control
                                type="title"
                                placeholder="Enter title"
                                {...field}
                            />
                        )}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Description</Form.Label>
                    <Controller
                        name="description"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                            // <Form.Control
                            //     type="description"
                            //     placeholder="Enter description"
                            //     {...field}
                            // />
                            <Form.Control as="textarea" rows={3} placeholder="Enter description" {...field} />

                        )}
                    />
                </Form.Group>
                <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Image</Form.Label>
                    {/* <Controller
                        name="image"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                            <Form.Control type="file" {...field} />
                        )}
                    /> */}
                    <Form.Control type="file" onChange={onChangeFile} />
                </Form.Group>
                <Button as="input" type="submit" value="Submit" />{' '}

            </Form>
        </div>
    )
}
export default CreatePost;