import BoxSection from '../components/CssComp/BoxSection/BoxSection';
import DotsLong from "../svgs/Background/DotsLong.svg";
import GradientScrollElement from '../components/GradientScrollElement/GradientScrollElement';
import "./css/about.css";

export default function About() {

    return (
        <>

            <div className="aboutPageContainer">
                <h1 className="aboutPageTitle">About</h1>
                <div id="aboutScroll" className="aboutPageContent">
                    <BoxSection title={"What Is Note Notes?"} fontSize={"h2"}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque efficitur leo a nisi porttitor, at convallis dolor mattis. Aenean  et laoreet eros, non blandit tellus. Fusce vel sagittis turpis, vel commodo eros. Curabitur mattis aliquet erat, vitae pulvinar urna facilisis ut. Nullam efficitur varius est at tincidunt. Cras vehicula lorem nec pellentesque interdum. Donec aliquet mollis neque, nec rhoncus nunc venenatis in. Curabitur ut lectus in nunc faucibus luctus eget et dui. Praesent a tempor elit. Mauris pulvinar vel erat vitae varius.
                    </BoxSection>

                    <BoxSection title={"What Will I Learn?"} fontSize={"h2"}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque efficitur leo a nisi porttitor, at convallis dolor mattis. Aenean  et laoreet eros, non blandit tellus. Fusce vel sagittis turpis, vel commodo eros. Curabitur mattis aliquet erat, vitae pulvinar urna facilisis ut. Nullam efficitur varius est at tincidunt. Cras vehicula lorem nec pellentesque interdum. Donec aliquet mollis neque, nec rhoncus nunc venenatis in. Curabitur ut lectus in nunc faucibus luctus eget et dui. Praesent a tempor elit. Mauris pulvinar vel erat vitae varius.
                    </BoxSection>

                    <BoxSection title={"How Does It Work?"} fontSize={"h2"}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque efficitur leo a nisi porttitor, at convallis dolor mattis. Aenean  et laoreet eros, non blandit tellus. Fusce vel sagittis turpis, vel commodo eros. Curabitur mattis aliquet erat, vitae pulvinar urna facilisis ut. Nullam efficitur varius est at tincidunt. Cras vehicula lorem nec pellentesque interdum. Donec aliquet mollis neque, nec rhoncus nunc venenatis in. Curabitur ut lectus in nunc faucibus luctus eget et dui. Praesent a tempor elit. Mauris pulvinar vel erat vitae varius.
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque efficitur leo a nisi porttitor, at convallis dolor mattis. Aenean  et laoreet eros, non blandit tellus. Fusce vel sagittis turpis, vel commodo eros. Curabitur mattis aliquet erat, vitae pulvinar urna facilisis ut. Nullam efficitur varius est at tincidunt. Cras vehicula lorem nec pellentesque interdum. Donec aliquet mollis neque, nec rhoncus nunc venenatis in. Curabitur ut lectus in nunc faucibus luctus eget et dui. Praesent a tempor elit. Mauris pulvinar vel erat vitae varius.
                    </BoxSection>

                    <BoxSection title={"How Can I Use It?"} fontSize={"h2"}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque efficitur leo a nisi porttitor, at convallis dolor mattis. Aenean  et laoreet eros, non blandit tellus. Fusce vel sagittis turpis, vel commodo eros. Curabitur mattis aliquet erat, vitae pulvinar urna facilisis ut. Nullam efficitur varius est at tincidunt. Cras vehicula lorem nec pellentesque interdum. Donec aliquet mollis neque, nec rhoncus nunc venenatis in. Curabitur ut lectus in nunc faucibus luctus eget et dui. Praesent a tempor elit. Mauris pulvinar vel erat vitae varius.
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque efficitur leo a nisi porttitor, at convallis dolor mattis. Aenean  et laoreet eros, non blandit tellus. Fusce vel sagittis turpis, vel commodo eros. Curabitur mattis aliquet erat, vitae pulvinar urna facilisis ut. Nullam efficitur varius est at tincidunt. Cras vehicula lorem nec pellentesque interdum. Donec aliquet mollis neque, nec rhoncus nunc venenatis in. Curabitur ut lectus in nunc faucibus luctus eget et dui. Praesent a tempor elit. Mauris pulvinar vel erat vitae varius.
                    </BoxSection>

                    <BoxSection title={"What To Do Upon Completion?"} fontSize={"h2"}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque efficitur leo a nisi porttitor, at convallis dolor mattis. Aenean  et laoreet eros, non blandit tellus. Fusce vel sagittis turpis, vel commodo eros. Curabitur mattis aliquet erat, vitae pulvinar urna facilisis ut. Nullam efficitur varius est at tincidunt. Cras vehicula lorem nec pellentesque interdum. Donec aliquet mollis neque, nec rhoncus nunc venenatis in. Curabitur ut lectus in nunc faucibus luctus eget et dui. Praesent a tempor elit. Mauris pulvinar vel erat vitae varius.
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque efficitur leo a nisi porttitor, at convallis dolor mattis. Aenean  et laoreet eros, non blandit tellus. Fusce vel sagittis turpis, vel commodo eros. Curabitur mattis aliquet erat, vitae pulvinar urna facilisis ut. Nullam efficitur varius est at tincidunt. Cras vehicula lorem nec pellentesque interdum. Donec aliquet mollis neque, nec rhoncus nunc venenatis in. Curabitur ut lectus in nunc faucibus luctus eget et dui. Praesent a tempor elit. Mauris pulvinar vel erat vitae varius.
                    </BoxSection>
                </div>
            </div>

            <GradientScrollElement controlId="#aboutScroll" />
            <div className="aboutBg">
                <img className="dotsAbout" src={DotsLong} alt="dots" />
            </div>
        </>
    );
}

// Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque efficitur leo a nisi porttitor, at convallis dolor mattis. Aenean  et laoreet eros, non blandit tellus. Fusce vel sagittis turpis, vel commodo eros. Curabitur mattis aliquet erat, vitae pulvinar urna facilisis ut. Nullam efficitur varius est at tincidunt. Cras vehicula lorem nec pellentesque interdum. Donec aliquet mollis neque, nec rhoncus nunc venenatis in. Curabitur ut lectus in nunc faucibus luctus eget et dui. Praesent a tempor elit. Mauris pulvinar vel erat vitae varius. Pellentesque fermentum augue quis nisi mattis aliquam. Proin magna metus, volutpat quis augue eu, ultricies dapibus odio.