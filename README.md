# **Alert server**
## **Usage:**

### Login
`request:`
```javascript
url: http://APIBASE/api/login
method: POST
body: {
    "fcmToken": "yourFcmToken"
}
```
`responce:`
```json
{
	"clientInfo": {
		"c_id": "87e5c733-b832-461a-bb6d-9410de81efbd",
		"fcm_token": "yourFcmToken",
		"region": null
	},
	"tokens": {
		"accessToken": "yourAccesToken",
		"refreshToken": "yourRefreshToken"
	}
}
```
### Alert locations 
`request:`
```javascript
{
    url: http://APIBASE/api/alertLocations
    method: GET
    authorization: Bearer "yourAccesToken"
}
```
`responce:`
```json
{
	"alertLocations": [
		{
			"id": 2,
			"dangerLevel": "HIGH",
			"title": "Luhans'k",
			"dateFrom": "2022-05-31T14:31:19.842Z"
		}
	]
}
```
### Update client region
`request:`
```javascript
{
    url:http://APIBASE/api/updateRegion
    method: POST
    authorization: Bearer "yourAccesToken"
    body:{
    	"region": "Kyiv"
    }
}
```
`responce:`
```json
{
	"c_id": "87e5c733-b832-461a-bb6d-9410de81efbd",
	"fcm_token": "yourFcmToken",
	"region": "Kyiv"
}
```
### Refresh acces token
`request:`
```javascript
{
    url: http://APIBASE/api/refresh
    method: GET
    authorization: Bearer "yourRefreshToken"
}
```
`responce:`
```json
{
	"accessToken": "yourNewAccesToken",
	"refreshToken": "yourNewRefreshToken"
}
```
