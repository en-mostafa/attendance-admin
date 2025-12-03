import dynamic from 'next/dynamic';
import 'react-quill-new/dist/quill.snow.css';
const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });

interface Props {
    description: any,
    setDescription: (description: any) => void
}

const toolbarOptions = [
    ['bold', 'italic', 'underline'],        
    ['blockquote', 'code-block'],
    ['link', 'image', 'video'],
    [{ 'size': ['small', false, 'large', 'huge'] }],
    [{ 'color': [] }, { 'background': [] }],          
    [{ 'font': [] }],
    [{ 'align': [] }],
];
const modules = {
    toolbar: toolbarOptions,
}
export default function Editor({ description, setDescription }: Props ) {
    return (
        <ReactQuill 
            theme="snow" 
            modules={modules} 
            value={description} 
            onChange={(value) => setDescription(value)}
        />
    )
}