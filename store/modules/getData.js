import { HTTP } from '../services/http-common'
import { checkRes } from '../services/validate'
import getCookie from '../services/cookie'
import jwtDecode from 'jwt-decode'
import { convertNumber2Persian, convertNumbers2English, checkObjResNumber } from '../../store/services/convertNumbers'
import { timeStampConverterToDate, dateConvertToTimeStamp } from '../../store/services/convertDate'


const _ = require('lodash')
const Cookie = process.client ? require('js-cookie') : undefined


const moduleGetData = {
    namespaced: true,
    state: {
        dataTables: [],
        loading: false,
        fields: null,
        pageIndex: 0,
        pageSize: 0,
        oldPageSize:0,
        param: null,
        totalRows:0,
        searchTerms:null,
        msgError: null
    },
    mutations: {
        setParam: (state, payload) => {
            state.param = payload.param
        },
        setMsgError: ( state, payload) => {
            state.msgError = payload.msg
        },
        setData: (state, payload) => {
            if(payload.data.length !== 0 ){
                let data = state.dataTables
                if(!payload.search){
                    let newData = data.concat(payload.data)
                    state.dataTables = newData
                    state.dataTables = checkObjResNumber(newData)
                }else{
                    state.dataTables = checkObjResNumber(payload.data)
                }
            }else{
                state.dataTables = payload.data;
            }

        },
        setParamsPages: (state, payload ) => {
            if(payload.pageSize) {
                state.pageSize = payload.pageSize;
            }
            if(payload.pageIndex){
                state.pageIndex = payload.pageIndex;
            }
            if(payload.total){
                state.totalRows = payload.total;

            }
        },
        setFields: (state, payload) => {
            if(payload.DisplayFields !== null){
                let fields = [
                    {
                        key: 'index',
                        label: localFunctionTrans('indexTable'),
                        sortable: true
                    }
                ]
                for (let i=0; i< payload.DisplayFields.length; i++) {
                    fields.push({
                        key: payload.DisplayFields[i],
                        label: localFunctionTrans(payload.DisplayFields[i]),
                        sortable: true
                    })
                }
                fields.push({
                    key: 'show_details',
                    label: localFunctionTrans('show_details'),
                    sortable: false
                })
                state.fields = fields;
            }else{
                state.fields = payload.DisplayFields;
            }

        }
    },
    getters: {
        getLoading: (state) => {
            return state.loading
        },
        getMsgError: (state) => {
            return state.msgError
        },
        getDataTables: (state) => {
            return state.dataTables
        },
        getFields: (state) => {
            return state.fields
        },
        getFieldSearch: (state) => {
            return state.fieldSearch
        },
        getPageSize: (state) => {
            return state.pageSize
        },
        getTotalRows: (state) => {
            return state.totalRows
        }
    },
    actions: {
        changeParamsPages({commit, state, rootState}, payload) {
            commit({
                type: 'setParamsPages',
                pageIndex: payload.pageIndex
            })
        },
        getParam({commit, state, rootState}, payload) {
            commit({
                type: 'setParam',
                param: payload.param
            })
        },
        getPageSize({commit, state, rootState}, payload) {
            commit({
                type: 'setParamsPages',
                pageSize: payload.pageSize
            })
        },
        resetData({commit, state, rooState}, payload) {
            commit({
                type: 'setData',
                data: [],
                search: ''
            })
            commit({
                type: 'setFields',
                DisplayFields: null
            })
            commit({
                type: 'setParamsPages',
                pageSize: 0,
                pageIndex: 0,
                total: 0
            })
        },
        getData({commit, state, rootState}, payload) {
            // console.log('timeConvertToTimeStamp is:',timeConvertToTimeStamp('2018-11-04','en'));
            // console.log('timeConvertToTimeStamp is:',timeConvertToTimeStamp('1397/08/13','fa'));
            // console.log('timeStampConverterToDate(1541277000) is:',timeStampConverterToDate(1539681331));
            state.loading = true
            let url = null
            let BaseUrl = null
            let DisplayFields = []
            commit({
                type: 'setMsgError',
                msg: null
            })

            switch (state.param) {
                case  'Products':
                    BaseUrl = 'http://catalog.himart.co/';
                    DisplayFields = ['barcode', 'title', 'price', 'brand', 'category1', 'category2', 'category3'];
                    break;
                case  'Stores':
                    BaseUrl = 'http://store.himart.co/';
                    DisplayFields = ['managerFullName', 'managerMobileNumber', 'shopName', 'workTime_start', 'workTime_end', 'title','description']
                    break;
                case  'GetAllCampaings':
                    BaseUrl = 'http://discount.himart.co/';
                    DisplayFields = ['title', 'description', 'disountAmountPerQuantity', 'minimumQuantityPerCustomer', 'maximumQuantityPerCustomer', 'productBarcode', 'firstBuyDiscountAmount']
                    break;
                default:
                    break
            }
            if(state.pageSize !== 0 && state.pageIndex !== 0 ){
                url = state.param + '?pageSize=' + state.pageSize + '&pageIndex=' + state.pageIndex
            }else{
                url = state.param
            }
            if(payload.search) {
                url = state.param + '?searchTerm=' + payload.search
            }
            let myCookie = getCookie("auth");
            // console.log('myCookie is:', myCookie)


            HTTP.get(BaseUrl,url)
                .then((res) => {
                    if (checkRes(res)) {
                        state.loading = false
                        commit({
                            type: 'setData',
                            data: res.data.data,
                            search: payload.search
                        })
                        commit({
                            type: 'setFields',
                            DisplayFields: DisplayFields
                        })
                        commit({
                            type: 'setParamsPages',
                            pageSize: res.data.pageOptions.pageSize,
                            pageIndex: res.data.pageOptions.pageIndex,
                            total: res.data.pageOptions.total,
                        })
                    }
                })
                .catch((err) => {
                    state.loading = false
                    console.log('err is:', err)
                    err = err.toString()
                    commit({
                        type: 'setMsgError',
                        msg: 'مشکلی در سرور به وجود آمده است ... !'
                    })
                    return err
                })
        }
    }
}
export default moduleGetData
