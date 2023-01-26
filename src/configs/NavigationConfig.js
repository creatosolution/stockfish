import { DashboardOutlined } from '@ant-design/icons';
import { APP_PREFIX_PATH } from 'configs/AppConfig'


const dashBoardNavTree = [{
  key: 'dashboards',
  path: `${APP_PREFIX_PATH}/dashboards`,
  title: 'sidenav.dashboard',
  icon: DashboardOutlined,
  breadcrumb: false,
  isGroupTitle: true,
  submenu: [
    {
      key: 'dashboards-credits',
      path: `${APP_PREFIX_PATH}/dashboards/credit`,
      title: 'sidenav.dashboard.credit',
      icon: DashboardOutlined,
      breadcrumb: false,
      submenu: []
    },
    {
      key: 'dashboards-deals',
      path: `${APP_PREFIX_PATH}/dashboards/deals`,
      title: 'sidenav.dashboard.deals',
      icon: DashboardOutlined,
      breadcrumb: false,
      submenu: []
    }
  ]
}]

const navigationConfig = [
  ...dashBoardNavTree
]

export default navigationConfig;
