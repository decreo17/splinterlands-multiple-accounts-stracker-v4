import $ from 'jquery';
import splinterlandsApi from './splinterlandsApi';

const api = splinterlandsApi

const getSplinterlandsSettings = async() => {
    let res 
    try {
        res = await $.getJSON(`${api}/settings`)
        return res
    } catch (error) {
      console.log(error);
    }
}

const settingsApi = getSplinterlandsSettings()

export default settingsApi


