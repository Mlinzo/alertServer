# **Alert server**
## **Usage:**

### Login
`request:`
```javascript
url: http://APIBASE/api/login
method: POST
body: {
    "fcmToken": "jaADIASmhafiamsfdiajnalxhidahmdasdahmdsida"
}
```
`responce:`
```json
{
	"clientInfo": {
		"c_id": "87e5c733-b832-461a-bb6d-9410de81efbd",
		"fcm_token": "jaADIASmhafiamsfdiajnalxhidahmdasdahmdsida",
		"region": null
	},
	"tokens": {
		"accessToken": "hwIjoxNjU0MDMyMjA4fQ.6nAFuIDTWZ6MIq-JjOSmsSa4vK9kVmOYS8ju39IOf-I",
		"refreshToken": "hwIjoxNjU2NjEzNDA4fQ.t4P8ENYbpRAHoYSTmdFmezP5LA_s9BvWVE0Dh8NQ1Io"
	}
}
```
### Alert locations 
`request:`
```javascript
{
    url: http://APIBASE/api/alertLocations
    method: GET
    authorization: Bearer "hwIjoxNjU0MDMyMjA4fQ.6nAFuIDTWZ6MIq-JjOSmsSa4vK9kVmOYS8ju39IOf-I"
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
    authorization: Bearer "hwIjoxNjU0MDMyMjA4fQ.6nAFuIDTWZ6MIq-JjOSmsSa4vK9kVmOYS8ju39IOf-I"
    body:{
    	"region": "Kyiv"
    }
}
```
`responce:`
```json
{
	"c_id": "87e5c733-b832-461a-bb6d-9410de81efbd",
	"fcm_token": "jaADIASmhafiamsfdiajnalxhidahmdasdahmdsida",
	"region": "Kyiv"
}
```
### Refresh acces token
`request:`
```javascript
{
    url: http://APIBASE/api/refresh
    method: GET
    authorization: Bearer "hwIjoxNjU2NjEzNDA4fQ.t4P8ENYbpRAHoYSTmdFmezP5LA_s9BvWVE0Dh8NQ1Io"
}
```
`responce:`
```json
{
	"accessToken": "hwIjoxNjU2NjEzNDA4fQ.t468EN1bpRAHoasSmdFmezP5LA_s9BvWVE0Dh1NQ1Io",
	"refreshToken": "hwIjoxNjU2NjEzNDA4fQ.t468bzN12pRAHAssSmddmezP5LA_s9BvWVE0Dh1NQ1Io"
}
```