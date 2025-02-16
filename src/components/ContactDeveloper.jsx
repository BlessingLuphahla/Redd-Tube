import { Link } from "react-router";

const ContactDeveloper = () => {
  return (
    <div>
      <h1>Contact the Developer</h1>
      <p>
        If you have any questions, feedback, or issues, feel free to reach out!
      </p>
      <p>
        You can contact me directly via email at{" "}
        <Link
          style={{ textDecoration: "none" }}
          to="mailto:luphahlablessingthamsanqa@gmail.com"
        >
          luphahlablessingthamsanqa@gmail.com
        </Link>
      </p>
      <p>
        Alternatively, you can connect with me on social media:
        <ul>
          <li>
            <a
              href="https://twitter.com/developer"
              target="_blank"
              rel="noopener noreferrer"
            >
              Twitter
            </a>
          </li>
          <li>
            <a
              href="https://github.com/BlessingLuphahla"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </li>
          <li>
            <a
              href="https://linkedin.com/in/developer"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </li>
        </ul>
      </p>
      <p>I will be happy to assist you!</p>
    </div>
  );
};

export default ContactDeveloper;
