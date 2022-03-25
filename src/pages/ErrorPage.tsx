interface IErrorPageProps {
  errorMsg: string;
}

const ErrorPage: React.FC<IErrorPageProps> = props => {
  const { errorMsg } = props;
  return (
    <div>
      <h1>Page Not found</h1>
      <p>{errorMsg}</p>
    </div>
  );
};

export default ErrorPage;
