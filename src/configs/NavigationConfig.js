import { DashboardOutlined } from '@ant-design/icons';
import { UsergroupAddOutlined , AlignCenterOutlined,RetweetOutlined, SnippetsOutlined} from '@ant-design/icons';

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
      key: 'dashboards-equityAndBalance',
      path: `${APP_PREFIX_PATH}/dashboards/equityAndBalance/search`,
      title: 'sidenav.dashboard.equityAndBalance',
      icon: SnippetsOutlined,
      breadcrumb: false,
      submenu: [
        // {
        //   key: 'dashboards-accountall',
        //   path: `${APP_PREFIX_PATH}/dashboards/equityAndBalance`,
        //   title: 'sidenav.dashboard.accountsAll',
        //   icon: SnippetsOutlined,
        //   breadcrumb: false,
        //   submenu: []
        // },
        // {
        //   key: 'dashboards-accountSearch',
        //   path: `${APP_PREFIX_PATH}/dashboards/equityAndBalance/search`,
        //   title: 'sidenav.dashboard.accountSearch',
        //   icon: SnippetsOutlined,
        //   breadcrumb: false,
        //   submenu: []
        // }
      ]
    },
    // {
    //   key: 'dashboards-credits',
    //   path: `${APP_PREFIX_PATH}/dashboards/credit`,
    //   title: 'sidenav.dashboard.credit',
    //   icon: DashboardOutlined,
    //   breadcrumb: false,
    //   submenu: []
    // },
    {
      key: 'dashboards-deals',
      path: `${APP_PREFIX_PATH}/dashboards/deals/search`,
      title: 'sidenav.dashboard.deals',
      icon: RetweetOutlined,
      breadcrumb: false,
      submenu: [
        // {
        //   key: 'dashboards-dealAll',
        //   path: `${APP_PREFIX_PATH}/dashboards/deals`,
        //   title: 'sidenav.dashboard.dealAll',
        //   icon: RetweetOutlined,
        //   breadcrumb: false,
        //   submenu: []
        // },
        // {
        //   key: 'dashboards-dealSearch',
        //   path: `${APP_PREFIX_PATH}/dashboards/deals/search`,
        //   title: 'sidenav.dashboard.dealSearch',
        //   icon: RetweetOutlined,
        //   breadcrumb: false,
        //   submenu: []
        // }
      ]
    },
    {
      key: 'dashboards-position',
      path: `${APP_PREFIX_PATH}/dashboards/position/search`,
      title: 'sidenav.dashboard.position',
      icon: AlignCenterOutlined,
      breadcrumb: false,
      submenu: [
      ]
    },
    {
      key: 'dashboards-orders',
      path: `${APP_PREFIX_PATH}/dashboards/orders/search`,
      title: 'sidenav.dashboard.orders',
      icon: AlignCenterOutlined,
      breadcrumb: false,
      submenu: [
      ]
    }
  ]
}]

const navigationConfig = [
  ...dashBoardNavTree
]

export default navigationConfig;
