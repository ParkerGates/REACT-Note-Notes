import './css/Page2.css';

interface Page2 {
    content: any;
    contentHandler(page: string, value: any): void;
}

export default function SetUpPage2({content, contentHandler}: Page2) {

    return (
        <div>
            <div>Page 2</div>
            <input type="text" value={content} onChange={(event) => contentHandler("page2", event.target.value)} />
            <div>{content}</div>
        </div>
    )
}