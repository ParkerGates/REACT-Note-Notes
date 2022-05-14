import './css/Page3.css';

interface Page3 {
    content: any;
    contentHandler(page: string, value: any): void;
}

export default function SetUpPage3({content, contentHandler}: Page3) {

    return (
        <div>
            <div>Page 3</div>
            <input type="text" value={content} onChange={(event)=>contentHandler("page3", event.target.value)} />
            <div>{content}</div>
        </div>
    )
}