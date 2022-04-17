import { Result, Button } from 'antd';
import { useLocation, NavLink } from 'react-router-dom';

function Error() {
  const { pathname } = useLocation();
  const type = pathname === '/forbidden' ? 'forbidden' : 'notfound';
  const config = {
    forbidden: {
      status: 403,
      title: '403',
      subTitle: 'Sorry, you are not authorized to access this page.',
    },
    notfound: {
      status: 404,
      title: '404',
      subTitle: 'Sorry, the page you visited does not exist.',
    },
  }[type];

  return (
    <Result
      status={config.status}
      title={config.title}
      subTitle={config.subTitle}
      extra={
        <NavLink to="/">
          <Button type="primary">Go to Main Page</Button>
        </NavLink>
      }
    />
  );
}

export default Error;
