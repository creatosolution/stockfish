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
        sorter: (a, b) => utils.antdTableSorter(a, b, 'Time')
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
        title: 'Volume',
        dataIndex: 'Volume',
        align: 'right',
        sorter: (a, b) => utils.antdTableSorter(a, b, 'Volume'),
        render: (_, elm) => (
            <div className="d-flex justify-content-end">
                {/* {elm.Action === 0 ? 'Zero': 'else 1'}
                {elm.Volume / 10000} */}
              {elm.Action == 0 ?
                <>
                    <span className='text-info'>{'+'+elm.Volume / 10000}</span>
                </>
                : <>
                 <span className='text-danger'>{'-'+elm.Volume / 10000}</span>
                </>
                }
            </div>
          )
    },
    // {
    //     title: 'Type',
    //     dataIndex: 'type',
    //     render: (_, elm) => (
    //         <div className="d-flex">
    //           {elm.Action == 0 ? "Buy" : "Sell"}
    //         </div>
    //       )
    // },
    
    {
        title: 'Price',
        dataIndex: 'Price',
        align: 'right',
        sorter: (a, b) => utils.antdTableSorter(a, b, 'Price')
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
        align: 'right',
        sorter: (a, b) => utils.antdTableSorter(a, b, 'Commission'),
        render: (_, elm) => (
            <>
                {elm.Commission.toFixed(2)}
            
            </>
        )
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


export const accountColumns = [
    {
        title: 'Client id',
        dataIndex: 'clientId',
        sorter: (a, b) => utils.antdTableSorter(a, b, 'clientId')
    },
    {
        title: 'Client Name',
        dataIndex: 'clientName',
        sorter: (a, b) => utils.antdTableSorter(a, b, 'clientName')
    },
    // {
    //     title: 'Group Name',
    //     dataIndex: 'groupName',
    //     sorter: (a, b) => utils.antdTableSorter(a, b, 'groupName')
    // },
    {
        title: 'Balance',
        dataIndex: 'balance',
        sorter: (a, b) => utils.antdTableSorter(a, b, 'balance')
    },
    {
        title: 'Credit',
        dataIndex: 'credit',
        sorter: (a, b) => utils.antdTableSorter(a, b, 'credit')
    },
    {
        title: 'Equity',
        dataIndex: 'equity',
        sorter: (a, b) => utils.antdTableSorter(a, b, 'equity')
    },
    {
        title: 'M2M',
        dataIndex: 'm2m',
        sorter: (a, b) => utils.antdTableSorter(a, b, 'm2m')
    }
]



export const positionTableColumns = [
 
    {
        title: 'ID',
        dataIndex: 'Position',
        sorter: (a, b) => utils.antdTableSorter(a, b, 'Position')
    },
    
    {
        title: 'Login',
        dataIndex: 'Login',
        sorter: (a, b) => utils.antdTableSorter(a, b, 'Login')
    },
   
    
    {
        title: 'Symbol',
        dataIndex: 'Symbol',
        sorter: (a, b) => utils.antdTableSorter(a, b, 'Symbol')
    },
    {
        title: 'Volume',
        dataIndex: 'Volume',
        sorter: (a, b) => utils.antdTableSorter(a, b, 'Volume'),
        render: (_, elm) => (
            <div className="d-flex">
                {/* {elm.Action === 0 ? 'Zero': 'else 1'}
                {elm.Volume / 10000} */}
              {elm.Action == 0 ?
                <>
                    <span className='text-info'>{elm.Volume / 10000}</span>
                </>
                : <>
                 <span className='text-danger'>{elm.Volume / 10000}</span>
                </>
                }
            </div>
          )
    },
    // {
    //     title: 'Action',
    //     dataIndex: 'Action',
    //     sorter: (a, b) => utils.antdTableSorter(a, b, 'Action'),
    //     render: (_, elm) => (
    //         <div className="d-flex">
    //           {elm.Action == 0 ? "Buy" : "Sell"}
    //         </div>
    //       )
    // },
    {
        title: 'Open Price',
        dataIndex: 'PriceOpen',
        align: 'right',
        sorter: (a, b) => utils.antdTableSorter(a, b, 'PriceOpen'),
        render: (_, elm) => (
            <>
                {elm.PriceOpen.toFixed(2)}
            
            </>
        )
    },
    {
        title: 'Current Price',
        dataIndex: 'PriceCurrent',
        align: 'right',
        sorter: (a, b) => utils.antdTableSorter(a, b, 'PriceCurrent')
    },
    {
        title: 'Profit',
        dataIndex: 'Profit',
        align: 'right',
        sorter: (a, b) => utils.antdTableSorter(a, b, 'Profit'),
        render:(_, elm)=>(
            <>
            { elm.Profit.toFixed(2)}
            </>
        )
    }
];



export const ordersTableColumns = [
    
    {
        title: 'Login',
        dataIndex: 'Login',
        sorter: (a, b) => utils.antdTableSorter(a, b, 'Login')
    },
   
    {
        title: 'Time',
        dataIndex: 'TimeSetup',
        sorter: (a, b) => utils.antdTableSorter(a, b, 'TimeSetup')
    },
   
    
    {
        title: 'Symbol',
        dataIndex: 'Symbol',
        sorter: (a, b) => utils.antdTableSorter(a, b, 'Symbol')
    },
    {
        title: 'Type',
        dataIndex: 'Type',
        sorter: (a, b) => utils.antdTableSorter(a, b, 'Type'),
        render: (_, elm) => (
            <div className="d-flex">
            {elm.Type == 2 && <> Buy Limit</>}
              {elm.Type == 3 && <> Sell Limit</>}
              {elm.Type == 4 && <> Buy Stop</>}
              {elm.Type == 5 && <> Sell Stop</>}
            </div>
          )
    },
    {
        title: 'Volume',
        dataIndex: 'VolumeCurrent',
        align: 'right',
        sorter: (a, b) => utils.antdTableSorter(a, b, 'Volume'),
        render: (_, elm) => (
            <div className="d-flex justify-content-end text-right">
                {elm.VolumeCurrent / 10000}
            </div>
          )
    },
   
    {
        title: 'Price Current',
        dataIndex: 'PriceCurrent',
        align: 'right',
        sorter: (a, b) => utils.antdTableSorter(a, b, 'PriceCurrent'),
        render: (_, elm) => (
            <div className="d-flex justify-content-end text-right">
                {elm.PriceCurrent}
            </div>
          )
    },
    {
        title: 'Price Order',
        dataIndex: 'PriceOrder',
        align: 'right',
        sorter: (a, b) => utils.antdTableSorter(a, b, 'PriceOrder'),
        render: (_, elm) => (
            <div className="d-flex justify-content-end text-right">
                {elm.PriceOrder}
            </div>
          )
    },
    {
        title: 'PriceTP',
        dataIndex: 'PriceTP',
        align: 'right',
        sorter: (a, b) => utils.antdTableSorter(a, b, 'PriceTP'),
        render: (_, elm) => (
            <div className="d-flex justify-content-end text-right">
                {elm.PriceTP}
            </div>
          )
    },
    {
        title: 'Price SL',
        dataIndex: 'PriceOrder',
        align: 'right',
        sorter: (a, b) => utils.antdTableSorter(a, b, 'PriceSL'),
        render: (_, elm) => (
            <div className="d-flex justify-content-end text-right">
                {elm.PriceSL.toFixed(2)}
            </div>
          )
    },




];