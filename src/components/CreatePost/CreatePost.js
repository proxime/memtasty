import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from '../Spinner';

import RecomendSection from '../Elements/RecomendSection';
import ImageUploader from './ImageUploader';
import CreatePostInput from './CreatePostInput';
import TextArea from './TextArea';
import Checkbox from './Checkbox';
import SelectInput from './SelectInput';
import UploadedImage from './UploadedImage';
import TagsInput from './TagsInput';
import PostLoadnig from './PostLoading';
import { createPost } from '../../store/actions/posts';

const CreatePost = () => {
    const [file, setFile] = useState('');
    const [fileError, setFileError] = useState('');
    const [addedTags, setAddedTags] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        desc: '',
        tags: '',
        is18: false,
        category: '',
    });

    const [errors, setErrors] = useState({
        title: '',
        desc: '',
        tags: '',
        category: '',
        other: '',
    });

    const { title, desc, tags, is18, category } = formData;

    const auth = useSelector(state => state.auth);
    const postsLoadnig = useSelector(state => state.posts.loading);
    const uploadProggress = useSelector(state => state.posts.changeProggress);
    const { loading, user } = auth;

    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
            window.scrollTo(0, 0);
        };
    }, []);

    if (!loading && !user) {
        return <Redirect to="/" />;
    }

    const handleDrop = e => {
        e.preventDefault();
        e.stopPropagation();
        const file = e.dataTransfer.files[0];
        if (!file) return;
        setFileError('');
        if (
            file.type !== 'image/jpeg' &&
            file.type !== 'image/png' &&
            file.type !== 'image/gif' &&
            file.type !== 'video/mp4'
        ) {
            return setFileError('Obsługiwane formaty to JPG, PNG, GIF, MP4');
        }
        if (file.size > 20 * 1024 * 1024) {
            return setFileError('Rozmiar nie może przekraczać 20MB!');
        }
        setFile(file);
    };

    const handleSelectFile = e => {
        const file = e.target.files[0];
        if (!file) return;
        setFileError('');
        if (file.size > 20 * 1024 * 1024) {
            return setFileError('Rozmiar nie może przekraczać 20MB!');
        }
        setFile(file);
    };

    const handleChangeData = e => {
        e.persist();
        if (e.target.name !== 'is18') {
            setFormData(prevState => ({
                ...prevState,
                [e.target.name]: e.target.value,
            }));
        } else {
            setFormData(prevState => ({
                ...prevState,
                is18: e.target.checked,
            }));
        }
    };

    const handleAddTaggs = e => {
        e.persist();
        if (!tags.trim()) return;
        if (e.which === 13) {
            setErrors(prevState => ({
                ...prevState,
                tags: '',
            }));
            if (tags.length > 15) {
                setErrors(prevState => ({
                    ...prevState,
                    tags: 'Tag może mieć 15 znaków',
                }));
                return;
            }
            setAddedTags(prevState => [...prevState, tags]);
            setFormData(prevState => ({
                ...prevState,
                tags: '',
            }));
        }
    };

    const handleRemoveTaggs = index => {
        setAddedTags(prevState => prevState.filter((tag, i) => index !== i));
    };

    const addNewPost = async () => {
        setErrors({
            title: '',
            desc: '',
            tags: '',
            category: '',
            other: '',
        });
        setFileError('');
        let error = false;

        if (title.trim().length < 6) {
            setErrors(prevState => ({
                ...prevState,
                title: 'Tytuł musi mieć minimum 6 znaków',
            }));
            error = true;
        } else if (title.length > 20) {
            setErrors(prevState => ({
                ...prevState,
                title: 'Tytuł może mieć maksymalnie 20 znaków',
            }));
            error = true;
        }

        if (desc.length > 50) {
            setErrors(prevState => ({
                ...prevState,
                desc: 'Opis nie może mieć więcej niż 50 znaków',
            }));
            error = true;
        }

        if (addedTags.length <= 0) {
            setErrors(prevState => ({
                ...prevState,
                tags: 'Dodaj tagi',
            }));
            error = true;
        } else if (addedTags.length > 3) {
            setErrors(prevState => ({
                ...prevState,
                tags: 'Możesz dodać tylko 3 tagi',
            }));
            error = true;
        }

        if (!category) {
            setErrors(prevState => ({
                ...prevState,
                category: 'Wybierz kategorię',
            }));
            error = true;
        }

        if (!file) {
            setFileError('Wybierz obraz!');
            error = true;
        } else if (
            file.type !== 'image/jpeg' &&
            file.type !== 'image/png' &&
            file.type !== 'image/gif' &&
            file.type !== 'video/mp4'
        ) {
            setFileError('Obsługiwane formaty to JPG, PNG, GIF, MP4');
            error = true;
        } else if (file.size > 20 * 1024 * 1024) {
            setFileError('Rozmiar nie może przekraczać 20MB!');
            error = true;
        }
        if (error) return;

        try {
            const res = await dispatch(
                createPost(formData, addedTags, file, setFileError)
            );

            if (res.status === 'ok') {
                setFormData({
                    title: '',
                    desc: '',
                    tags: '',
                    is18: false,
                    category: '',
                });
                setFile('');
                setAddedTags([]);
            } else {
                setErrors(prevState => ({
                    ...prevState,
                    other: 'Coś poszło nie tak',
                }));
            }
        } catch (err) {
            setErrors(prevState => ({
                ...prevState,
                other: 'Coś poszło nie tak',
            }));
        }
    };

    return (
        <div className="section">
            <div className="section__list">
                {loading ? (
                    <div className="create-post">
                        <Spinner size={200} />
                    </div>
                ) : (
                    <div className="create-post">
                        {postsLoadnig ? (
                            <PostLoadnig changeProggress={uploadProggress} />
                        ) : (
                            <>
                                <div className="create-post__title">
                                    Dodaj Post
                                </div>
                                <div className="create-post__main">
                                    <CreatePostInput
                                        title="Tytuł"
                                        type="text"
                                        name="title"
                                        value={title}
                                        handleChangeData={handleChangeData}
                                        error={errors.title}
                                    />
                                    <TextArea
                                        value={desc}
                                        handleChangeData={handleChangeData}
                                        name="desc"
                                        error={errors.desc}
                                    />
                                    {file ? (
                                        <UploadedImage
                                            file={file}
                                            fileError={fileError}
                                            handleSelectFile={handleSelectFile}
                                        />
                                    ) : (
                                        <ImageUploader
                                            handleDrop={handleDrop}
                                            handleSelectFile={handleSelectFile}
                                            error={fileError}
                                        />
                                    )}
                                    <TagsInput
                                        name="tags"
                                        value={tags}
                                        handleChangeData={handleChangeData}
                                        onEnter={handleAddTaggs}
                                        addedTags={addedTags}
                                        onRemove={handleRemoveTaggs}
                                        error={errors.tags}
                                    />
                                    <div className="create-post__double-item">
                                        <Checkbox
                                            checked={is18}
                                            name="is18"
                                            handleChangeData={handleChangeData}
                                        />
                                        <SelectInput
                                            value={category}
                                            name="category"
                                            handleChangeData={handleChangeData}
                                            error={errors.category}
                                        />
                                    </div>
                                    <div
                                        className="create-post__button"
                                        onClick={addNewPost}
                                    >
                                        Dodaj Post
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                )}
            </div>
            <RecomendSection />
        </div>
    );
};

export default CreatePost;
