import utils from 'utils'
import * as  moment from 'moment';

const getFullDate=(date)=>{
    console.log('coming date----<', date);
    if(date){
        var getOffset =  moment(new Date(date), 'YYYYMMDD')
       
        return getOffset
    }

    console.log('outing date----<', moment(new Date(date), 'YYYYMMDD'));
    return date
    
}
export const dealsTableColumns = [
    // {
    //     title: 'Deal',
    //     dataIndex: 'Deal'
    // },
    // {
    //     title: 'External ID',
    //     dataIndex: 'ExternalID',
    //     sorter: (a, b) => utils.antdTableSorter(a, b, 'ExternalID')
    // },
    {
        title: 'Login',
        dataIndex: 'Login',
        sorter: (a, b) => utils.antdTableSorter(a, b, 'Login')
    },
    // {
    //     title: 'Dealer',
    //     dataIndex: 'Dealer',
    //     sorter: (a, b) => utils.antdTableSorter(a, b, 'Dealer')
    // },
    // {
    //     title: 'Order',
    //     dataIndex: 'Order',
    //     sorter: (a, b) => utils.antdTableSorter(a, b, 'Order')
    // },
    // {
    //     title: 'Action',
    //     dataIndex: 'Action',
    //     sorter: (a, b) => utils.antdTableSorter(a, b, 'Action')
    // },
    // {
    //     title: 'Entry',
    //     dataIndex: 'Entry',
    //     sorter: (a, b) => utils.antdTableSorter(a, b, 'Entry')
    // },
    // {
    //     title: 'Reason',
    //     dataIndex: 'Reason',
    //     sorter: (a, b) => utils.antdTableSorter(a, b, 'Reason')
    // },
    // {
    //     title: 'Digits',
    //     dataIndex: 'Digits',
    //     sorter: (a, b) => utils.antdTableSorter(a, b, 'Digits')
    // },
    // {
    //     title: 'Digits Currency',
    //     dataIndex: 'DigitsCurrency',
    //     sorter: (a, b) => utils.antdTableSorter(a, b, 'DigitsCurrency')
    // },
    // {
    //     title: 'Digits Currency',
    //     dataIndex: 'DigitsCurrency',
    //     sorter: (a, b) => utils.antdTableSorter(a, b, 'DigitsCurrency')
    // },
    // {
    //     title: 'Digits Currency',
    //     dataIndex: 'DigitsCurrency',
    //     sorter: (a, b) => utils.antdTableSorter(a, b, 'DigitsCurrency')
    // },
    {
        title: 'Time',
        dataIndex: 'Time',
        // render: ((date) => getFullDate(date)) ,
        // sorter: (a, b) => utils.antdTableSorter(a, b, 'Time')
    },
    // {
    //     title: 'Time Msc',
    //     dataIndex: 'TimeMsc',
    //     sorter: (a, b) => utils.antdTableSorter(a, b, 'TimeMsc')
    // },
    // {
    //     title: 'Time Msc',
    //     dataIndex: 'TimeMsc',
    //     sorter: (a, b) => utils.antdTableSorter(a, b, 'TimeMsc')
    // },
    {
        title: 'Symbol',
        dataIndex: 'Symbol',
        sorter: (a, b) => utils.antdTableSorter(a, b, 'Symbol')
    },
    {
        title: 'Price',
        dataIndex: 'Price',
        sorter: (a, b) => utils.antdTableSorter(a, b, 'Price')
    },
    {
        title: 'Volume',
        dataIndex: 'Volume',
        sorter: (a, b) => utils.antdTableSorter(a, b, 'Volume')
    },
    // {
    //     title: 'Volume Ext',
    //     dataIndex: 'VolumeExt',
    //     sorter: (a, b) => utils.antdTableSorter(a, b, 'VolumeExt')
    // },
    // {
    //     title: 'Volume Ext',
    //     dataIndex: 'VolumeExt',
    //     sorter: (a, b) => utils.antdTableSorter(a, b, 'VolumeExt')
    // },
    // {
    //     title: 'Profit',
    //     dataIndex: 'Profit',
    //     sorter: (a, b) => utils.antdTableSorter(a, b, 'Profit')
    // },
    // {
    //     title: 'Storage',
    //     dataIndex: 'Storage',
    //     sorter: (a, b) => utils.antdTableSorter(a, b, 'Storage')
    // },
    {
        title: 'Commission',
        dataIndex: 'Commission',
        sorter: (a, b) => utils.antdTableSorter(a, b, 'Commission')
    },
   // {
    //     title: 'Rate Profit',
    //     dataIndex: 'RateProfit',
    //     sorter: (a, b) => utils.antdTableSorter(a, b, 'RateProfit')
    // },
    // {
    //     title: 'Rate Margin',
    //     dataIndex: 'RateMargin',
    //     sorter: (a, b) => utils.antdTableSorter(a, b, 'RateMargin')
    // },
    // {
    //     title: 'Expert ID',
    //     dataIndex: 'ExpertID',
    //     sorter: (a, b) => utils.antdTableSorter(a, b, 'ExpertID')
    // },
    // {
    //     title: 'Position ID',
    //     dataIndex: 'PositionID',
    //     sorter: (a, b) => utils.antdTableSorter(a, b, 'PositionID')
    // }

    {
        title: 'Comment',
        dataIndex: 'Comment',
        sorter: (a, b) => utils.antdTableSorter(a, b, 'Comment')
    },
    // {
    //     title: 'ProfitRaw',
    //     dataIndex: 'ProfitRaw',
    //     sorter: (a, b) => utils.antdTableSorter(a, b, 'ProfitRaw')
    // },
    // {
    //     title: 'Price Position',
    //     dataIndex: 'PricePosition',
    //     sorter: (a, b) => utils.antdTableSorter(a, b, 'PricePosition')
    // },
    // {
    //     title: 'Volume Closed',
    //     dataIndex: 'VolumeClosed',
    //     sorter: (a, b) => utils.antdTableSorter(a, b, 'VolumeClosed')
    // },
    // {
    //     title: 'Volume Closed Ext',
    //     dataIndex: 'VolumeClosedExt',
    //     sorter: (a, b) => utils.antdTableSorter(a, b, 'VolumeClosedExt')
    // },
    // {
    //     title: 'Tick Value',
    //     dataIndex: 'TickValue',
    //     sorter: (a, b) => utils.antdTableSorter(a, b, 'TickValue')
    // },
    // {
    //     title: 'Tick Size',
    //     dataIndex: 'TickSize',
    //     sorter: (a, b) => utils.antdTableSorter(a, b, 'TickSize')
    // },
    // {
    //     title: 'Flags',
    //     dataIndex: 'Flags',
    //     sorter: (a, b) => utils.antdTableSorter(a, b, 'Flags')
    // },
    // {
    //     title: 'Price Gateway',
    //     dataIndex: 'PriceGateway',
    //     sorter: (a, b) => utils.antdTableSorter(a, b, 'PriceGateway')
    // },
    // {
    //     title: 'Modify Flags',
    //     dataIndex: 'ModifyFlags',
    //     sorter: (a, b) => utils.antdTableSorter(a, b, 'ModifyFlags')
    // },
    // {
    //     title: 'Price SL',
    //     dataIndex: 'PriceSL',
    //     sorter: (a, b) => utils.antdTableSorter(a, b, 'PriceSL')
    // },
    // {
    //     title: 'Price TP',
    //     dataIndex: 'PriceTP',
    //     sorter: (a, b) => utils.antdTableSorter(a, b, 'PriceTP')
    // }
];

export const userEquityTableColumns = [
    {
        title: 'Credit',
        dataIndex: 'user_credit'
    },
    {
        title: 'Equity',
        dataIndex: 'user_equity'
    },
    {
        title: 'Balance',
        dataIndex: 'user_balance'
    },
    {
        title: 'M2M',
        dataIndex: 'm2m'
    }
]

export const creditTypes = [
    {
        label: 'Credit In',
        value: 'deposit'
    }, 
    {
        label: 'Credir Out',
        value: 'withdrawal'
    }
]