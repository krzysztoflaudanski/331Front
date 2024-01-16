import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form"


const AdForm = ({ action, actionText, ...props }) => {

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            title: props.title || '',
            user: props.user || '',
            price: props.price || '',
            content: props.content || '',
            location: props.location || '',
            id: props.id || '',
            image: props.image || ''
        }
    });

    const onSubmit = (data) => {
        action(data);
    };

    return (
        <Form onSubmit={handleSubmit(onSubmit)} className="">

            <Form.Group className="mb-3" controlId="title" style={{ minWidth: '300px' }}>
                <Form.Label>Title</Form.Label>
                <Form.Control {...register("title", { required: true, minLength: 10, maxLength: 50, pattern: /^(?!.*[<>])[A-z\d\s.,!?$-*:]*$/ })}
                    type="text" placeholder="Enter title" />
                {errors.title && <small className='d-block form-text text-danger mt-2'>only a-z, A-Z, 1-9, .,!?$-*: are available, min:10, max:50, only english letters allowed</small>}
            </Form.Group>
            <Form.Group className="mb-3" controlId="content" style={{ minWidth: '300px' }}>
                <Form.Label>Content</Form.Label>
                <Form.Control {...register("content", { required: true, minLength: 20, maxLength: 1000, pattern: /^(?!.*[<>])[A-z\d\s.,!?$-*:]*$/ })}
                    as="textarea" placeholder="Enter content" rows={10} />
                {errors.content && <small className='d-block form-text text-danger mt-2'> only a-z, A-Z, 1-9, .,!?$-*: are available, min:20, max:1000, only english letters allowed</small>}
            </Form.Group>
            <Form.Group className="mb-3" controlId="location" style={{ minWidth: '300px' }}>
                <Form.Label>Location</Form.Label>
                <Form.Control {...register("location", { required: true, pattern: /^[a-zA-Z0-9-\s]+$/ })}
                    type="text" placeholder="Enter location" />
                {errors.location && <small className='d-block form-text text-danger mt-2'>Only a-z, A-Z, 0-9, "-" are available, only english letters allowed</small>}
            </Form.Group>
            <Form.Group className="mb-3" controlId="price" style={{ minWidth: '300px' }}>
                <Form.Label>Price</Form.Label>
                <Form.Control {...register("price", { required: true, pattern: /^[0-9]+$/ })}
                    type="text" placeholder="Enter price" />
                {errors.price && <small className='d-block form-text text-danger mt-2'>Only 0-9 are available</small>}
            </Form.Group>
            <Form.Group className="mb-3" controlId="image">
                <Form.Label>Image</Form.Label>
                <Form.Control
                    {...register("image", {
                        required: !props.id,
                        validate: {
                            validFileType: value => {
                                if (value && value[0] && value[0].name) {
                                    const validExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
                                    const fileExtension = value[0].name.split('.').pop().toLowerCase();
                                    return validExtensions.includes('.' + fileExtension);
                                }
                                return true;
                            },
                        },
                    })}
                    type="file"
                />
                {errors.image && errors.image.type === 'required' && (
                    <small className='d-block form-text text-danger mt-2'>Image is required</small>
                )}
                {errors.image && errors.image.type === 'validFileType' && (
                    <small className='d-block form-text text-danger mt-2'>Please upload an image file with a valid extension (jpg, jpeg, png, gif).</small>
                )}
            </Form.Group>
            <Button type="submit">{actionText}</Button>
        </Form>
    );
};

export default AdForm;