# jquery.sortme

## Simple Usage

Given a table with a structure of: 
``` html
<table>
    <thead>
        <tr>
            <th>Click Me!</th>
        </tr>
    </thead>
    <tbody>
      <tr>
        <td>Sortable Values!</td>
      </tr>
    </tbody>
</table>
```
Initialize the plugin on your table like so:
``` javascript
$('table').sortme();
```

##Additional options
If your date is pre-sorted server side, you can initialize the plugin with the following options

<table>
<tbody>
<tr>
    <td>Field</td>
    <td>Description</td>
</tr>
<tr>
    <td>serverSortedColumn</td>
    <td>The selector for the presorted column</td>
</tr>
<tr>
    <td>serverSortedAsc</td>
    <td>(optional, defaults to false) The direction of the sort</td>
</tr>
<tr>
    <td>sortElementSelector</td>
    <td>(optional, defaults to 'tbody tr') The selector for the elements to sort</td>
</tr>
<tr>
    <td>viewUpdater</td>
    <td>(optional, defaults to using build in remove/append logic) The function used to update the view</td>
</tr>
</tbody>
</table>

``` javascript
var opts = {
            serverSortedColumn: 'th.server-sort',
            serverSortedAsc: false
        };
$('table').sortme(opts);
```
