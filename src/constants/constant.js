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
  
    {
        title: 'Login',
        dataIndex: 'Login',
        sorter: (a, b) => utils.antdTableSorter(a, b, 'Login'),
        render: (_, elm) => (
            <div className="d-flex">
              
              {elm.Action == 0 ?
                <>
                    <span className='text-info'>{ elm.Login}</span>
                </>
                : <>
                 <span className='text-danger'>{elm.Login}</span>
                </>
                }
            </div>
          )
    },
   
    {
        title: 'Symbol',
        dataIndex: 'Symbol',
        sorter: (a, b) => utils.antdTableSorter(a, b, 'Symbol'),
        render: (_, elm) => (
            <div className="d-flex">
              
              {elm.Action == 0 ?
                <>
                    <span className='text-info'>{ elm.Symbol}</span>
                </>
                : <>
                 <span className='text-danger'>{elm.Symbol}</span>
                </>
                }
            </div>
          )
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
        sorter: (a, b) => utils.antdTableSorter(a, b, 'Price'),
        render: (_, elm) => (
            <div className="d-flex justify-content-end">
              
              {elm.Action == 0 ?
                <>
                    <span className='text-info'>{ elm.Price}</span>
                </>
                : <>
                 <span className='text-danger'>{elm.Price}</span>
                </>
                }
            </div>
          )
    },
  
    {
        title: 'Commission',
        dataIndex: 'Commission',
        align: 'right',
        sorter: (a, b) => utils.antdTableSorter(a, b, 'Commission'),
        render: (_, elm) => (
            <div className="d-flex d-flex justify-content-end">
              
              {elm.Action == 0 ?
                <>
                    <span className='text-info'> {elm.Commission.toFixed(2)}</span>
                </>
                : <>
                 <span className='text-danger'> {elm.Commission.toFixed(2)}</span>
                </>
                }
            </div>
          )
    
    },


    {
        title: 'Comment',
        dataIndex: 'Comment',
        sorter: (a, b) => utils.antdTableSorter(a, b, 'Comment'),
        render: (_, elm) => (
            <div className="d-flex">
              
              {elm.Action == 0 ?
                <>
                    <span className='text-info'> {elm.Comment}</span>
                </>
                : <>
                 <span className='text-danger'> {elm.Comment}</span>
                </>
                }
            </div>
          )
    }
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
        sorter: (a, b) => utils.antdTableSorter(a, b, 'Position'),
        render: (_, elm) => (
            <div className="d-flex"> 
              {elm.Action == 0 ?
                <>
                    <span className='text-info'>{elm.Position}</span>
                </>
                : <>
                 <span className='text-danger'>{elm.Position}</span>
                </>
                }
            </div>
          )
    },
    
    {
        title: 'Login',
        dataIndex: 'Login',
        sorter: (a, b) => utils.antdTableSorter(a, b, 'Login'),
        render: (_, elm) => (
            <div className="d-flex"> 
              {elm.Action == 0 ?
                <>
                    <span className='text-info'>{elm.Login}</span>
                </>
                : <>
                 <span className='text-danger'>{elm.Login}</span>
                </>
                }
            </div>
          )
    },
   
    
    {
        title: 'Symbol',
        dataIndex: 'Symbol',
        sorter: (a, b) => utils.antdTableSorter(a, b, 'Symbol'),
        render: (_, elm) => (
            <div className="d-flex"> 
              {elm.Action == 0 ?
                <>
                    <span className='text-info'>{elm.Symbol}</span>
                </>
                : <>
                 <span className='text-danger'>{elm.Symbol}</span>
                </>
                }
            </div>
          )
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
                    <span className='text-info'>{elm.Volume / 10000}</span>
                </>
                : <>
                 <span className='text-danger'>{elm.Volume / 10000}</span>
                </>
                }
            </div>
          )
    },
 
    {
        title: 'Open Price',
        dataIndex: 'PriceOpen',
        align: 'right',
        sorter: (a, b) => utils.antdTableSorter(a, b, 'PriceOpen'),
        render: (_, elm) => (
            <>
                 {elm.Action == 0 ?
                    <>
                        <span className='text-info'>{elm.PriceOpen.toFixed(2)}</span>
                    </>
                    : <>
                    <span className='text-danger'>{elm.PriceOpen.toFixed(2)}</span>
                    </>
                    }
            
            </>

            
        )
    }, 
    {
        title: 'Current Price',
        dataIndex: 'PriceCurrent',
        align: 'right',
        sorter: (a, b) => utils.antdTableSorter(a, b, 'PriceCurrent'),
        render: (_, elm) => (
            <>
                 {elm.Action == 0 ?
                    <>
                        <span className='text-info'>{elm.PriceCurrent.toFixed(2)}</span>
                    </>
                    : <>
                    <span className='text-danger'>{elm.PriceCurrent.toFixed(2)}</span>
                    </>
                    }
            
            </>

            
        )
    },
    {
        title: 'Profit',
        dataIndex: 'Profit',
        align: 'right',
        sorter: (a, b) => utils.antdTableSorter(a, b, 'Profit'),
      
        render: (_, elm) => (
            <>
                 {elm.Action == 0 ?
                    <>
                        <span className='text-info'>{elm.Profit.toFixed(2)}</span>
                    </>
                    : <>
                    <span className='text-danger'>{elm.Profit.toFixed(2)}</span>
                    </>
                    }
            
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

