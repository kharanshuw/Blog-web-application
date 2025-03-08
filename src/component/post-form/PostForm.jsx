import React from 'react'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Input, RTE, Select } from '../index.js'
import databaseservice from '../../auth_service/database_config.js'
import { data, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect } from 'react';


function PostForm({ post }) {

    /**
     * register: A function for registering input elements with react-hook-form.

handleSubmit: A function for handling form submission.

watch: A function for watching the values of form fields.

setValue: A function for programmatically setting the values of form fields.

control: An object used with the Controller component (as you saw in the RTE component) to manage form field state.

getValues: A function that lets you access current values from the form.
     */
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm(
        {
            defaultValues: {
                title: post?.title || '', //  optional chaining
                documentid: post?.$id || '', //  optional chaining and rename to $id
                content: post?.content || '', //  optional chaining
                status: post?.status || 'active', //  optional chaining

            },
        }
    )

    const navigate = useNavigate();

    /**
     * The user ID is obtained from the Redux store using the useSelector hook.
     */
    let userData = useSelector(state => state.auth.userData);

    /**
     * "When the form is submitted, this function runs. The data has all the info from the form."
     * @param {*} data 
     */
    const submit = async (data) => {

        /**
         * This checks if a post object is provided, indicating that the form is being used to update an existing post.
         */
        if (post) {
            //If the user picked a new image, upload it. Otherwise, there's no new file

            console.log("printing data");
            console.log(data);
            const file = data.image[0] ? await databaseservice.uploadFile(data.image[0]) : null;

            //"If we uploaded a new image..."
            if (file) {
                //"...delete the old image."
                databaseservice.deleteFile(post.featuredimages);
            }

            // "Now, update the post in the database with the new information (including the new image ID, if there was one)."
            const dbPost = await databaseservice.updatePost(post.$id, { ...data, featuredimages: file ? file.id : undefined });

            //"If the update was successful..."
            if (dbPost) {

                //"...go to the page that shows the updated post."
                navigate(`/post/${dbPost.$id}`);
            }
        }

        /** "But if we're creating a new post..." */
        else {

            // "Upload the image. in appwrite bucket"
            const file = await databaseservice.uploadFile(data.image[0]);

            /**
             *  "If the image uploaded successfully..."
             */
            if (file) {
                const fileid = file.$id;
                //"...save the image's ID."
                data.featuredimages = fileid;

                // "Create the new post in the database, including the image ID and the user's ID."
                const dbPost = await databaseservice.createPost({ ...data, userId: userData.$id });

                // "If the creation was successful..."
                if (dbPost) {
                    // "...go to the page that shows the new post."
                    navigate(`/post/${dbPost.$id}`);
                }
            }

        }
    };


    /**
     * "This is a function that turns text into a 'slug' (a clean, URL-friendly version).
     * "Do all this only once, because nothing this function depends on ever changes."
     */
    const slugTransform = useCallback(
        (value) => {

            /**
             *  "If there's some text and it is text..."
             */
            if (value && typeof value === "string") {
                return value
                    .trim()
                    .toLowerCase()
                    .replace(/[^a-zA-Z\d\s]+/g, '-')  //"...replace any weird characters (not letters, numbers, or spaces) with a hyphen."
                    .replace(/\s/g, "-");// "...replace all the spaces with hyphens."
            }

            /**
             * "But if there's no text, just return nothing."
             */
            else {

                return "";
            }
        }
        , []);



    useEffect(
        () => {
            /**"Start watching all the fields in the form. Whenever anything changes..." */

            /**
             *  // This function is called whenever the value of ANY form field changes.
                // The `value` argument contains the current values of all form fields.
                // The `{ name }` argument contains the name of the field that changed.
             */
            const subscription = watch(
                (value, { name }) => {

                    console.log("printing value ");

                    console.log(value);
                    /**
                     * "...check: did the thing that changed just now happen to be the 'title' field?"
                     */
                    if (name === 'title') {
                        /**
                         *  // If the `title` field changed:
                    // 1. Get the new value of the `title` field (value.title).
                    // 2. Transform it into a slug using the `slugTransform` function.
                    // 3. Set the value of the 'slug' field to the transformed value.
                    // 4. { shouldValidate: true } tells react-hook-form to validate the slug after the title has been changed.
                         */

                        let newvalue = value.title;
                        console.log("new value of title is ", newvalue);
                        setValue('slug', slugTransform(value.title), { shouldValidate: true });
                    }
                }
            );

            return () => subscription.unsubscribe();
            // This function is called when the component unmounts or when the dependencies of the useEffect hook change.
            // It's used to clean up any resources that were created by the useEffect hook.
            // In this case, it unsubscribes from the `watch` subscription, preventing memory leaks.

        },
        [watch, slugTransform, setValue]
    );



    return (
        /**
         *Start of the form element.
         When the form is submitted, call the `submit` function using the `handleSubmit` function from react-hook-form.
         */
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">


            {/**
            * This div will contain the title, slug, and content fields.
            */}
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                // Register this input field with react-hook-form using the `register` function.
                // The name of the field is "title", and it's required.
                />




                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"


                    // Register this input field with react-hook-form using the `register` function.
                    // The name of the field is "slug", and it's required.
                    {...register("slug", { required: true })}


                    // When the value of the input field changes, call the `slugTransform` function to transform the value into a slug,
                    // and set the value of the slug field to the transformed value.
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />



                {
                    /**
                     * Render the RTE (Rich Text Editor) component.
                       Set the label to "Content :", the name to "content", the control to the control object from react-hook-form,
                       and the default value to the current value of the content field.
                     */
                }
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />



            </div>



            {
                /**
                 *  Start of a div that takes up 1/3 of the width and has some padding.
                    This div will contain the featured image, status, and submit button.
                 */
            }
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"

                    // Register this input field with react-hook-form using the `register` function.
                    // The name of the field is "image", and it's required only if we are creating a new post (not updating an existing one).
                    {...register("image", { required: !post })}
                />
                {post //If we are updating an existing post (post object exists), render this block.

                    && (
                        <div className="w-full mb-4">
                            <img
                                src={databaseservice.getFilePreview(post.featuredimages)}
                                // Set the source of the image to the URL returned by the appwriteService.getFilePreview function,
                                // which generates a preview URL for the featured image.
                                alt={post.title}
                                className="rounded-lg"
                            />
                        </div>
                    )}




                <Select

                    // Set the props options for the select field to "active" and "inactive".
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {
                        /**
                         *  Render the Button component.
                            Set the type to "submit", which makes it a submit button for the form.
                            If we are updating an existing post, set the background color to "bg-green-500".
                            Apply the CSS class "w-full" to make the button take up the full width.
                         */
                    }
                    {post ? "Update" : "Submit"}

                    {
                        /**
                         * Set the text of the button to "Update" if we are updating an existing post,
                         *  and to "Submit" if we are creating a new post.
                         */
                    }
                </Button>
            </div>


            
        </form>
    )
}

export default PostForm