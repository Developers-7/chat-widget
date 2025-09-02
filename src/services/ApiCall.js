/**
 * Created by WebStorm.
 * User: Zishan
 * Date: 02 Sep 2025
 * Time: 12:18 PM
 * Email: zishan.softdev@gmail.com
 */
import PrivateApi from "../rest-handlers/PrivateApi.js";
import {GEMINI_AI_URL} from "./ApiURL.js";

export default class ApiCall {

    static resumeEditor = (data) => {
        return PrivateApi.post(GEMINI_AI_URL, data);
    };

}