import { Editor } from '@tinymce/tinymce-react'
import plugin from 'eslint-plugin-react'
import React from 'react'
import { Controller } from 'react-hook-form'


/**
 * It provides a way to integrate a rich text editor into your React forms and manage its content using the react-hook-form library.
 * name: The name of the form field. This is used by react-hook-form to identify the field.

    control: The control object from react-hook-form. This object is used to register the form field and manage its state.

    label: The label for the rich text editor. This is displayed above the editor.

    defaultvalue: The initial value for the rich text editor. If no value is provided, it defaults to an empty string.
 * @returns 
 */
function RTE({
    name, control, label, defaultvalue = ""
}) {

    return (
        <div className='w-full'>



            {label && <label className='inline-block mb-1 pl-1'>
                {label}    </label>}



            {/** This is the key part. 
             * It's the Controller component from react-hook-form. 
             * It's used to connect the TinyMCE editor to the form. 
             * */}            
                <Controller
                // name Specifies the name of the form field. 
                // If the name prop is provided, it uses that value. 
                // Otherwise, it defaults to "content".
                name={name || "content"}

                // Passes the control object from react-hook-form to the Controller.
                control={control}



                render={({ field: { onChange } }) => (


                    //This is the TinyMCE editor component.
                    <Editor

                        initialValue={defaultvalue}
                        init={   
                            //This is the initialization object for TinyMCE. It configures the editor's behavior, including:
                            {
                                initialValue: defaultvalue,
                                height: 500,
                                menubar: true,
                                plugin: [
                                    'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                                    'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                    'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                                ],
                                toolbar:
                                    'undo redo | blocks | ' +
                                    'bold italic forecolor | alignleft aligncenter ' +
                                    'alignright alignjustify | bullist numlist outdent indent | ' +
                                    'removeformat | help',
                                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                            }
                        }

                        onEditorChange={onChange}
                    />

                )}
            >

            </Controller>
        </div>
    )
}

export default RTE