/**
 * Created by WebStorm.
 * User: Zishan
 * Date: 02 Sep 2025
 * Time: 12:23 PM
 * Email: zishan.softdev@gmail.com
 */

import axios from "axios";

const instance = axios.create({
    baseURL: "",
    headers: {
        "Content-Type": "application/json",
    }
});

export default instance;