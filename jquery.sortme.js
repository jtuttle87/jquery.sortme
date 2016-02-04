(function ($) {

    var downArrow = '\u25bc';
    var upArrow = '\u25b2';

    var settings = {
    };

    var color = function (c, n, i, d) { for (i = 3; i--; c[i] = d < 0 ? 0 : d > 255 ? 255 : d | 0) d = c[i] + n; return c }

    var changeBackgroundColor = function ($el, amount) {
        var c = $el.css('background-color');
        c = eval('[' + c.substr(4, c.length - 5) + ']');
        var newColor = color(c, amount);
        $el.css('background-color', 'rgb(' + newColor.toString() + ')');
    };

    var isNumberType = function (values) {
        var result = true;
        values.forEach(function (val) {
            if (isNaN(parseFloat(val)))
                result = false;
        });
        return result;
    };

    var sort = function (e) {
        var $el = $(e.currentTarget);
        var $parentTable = $el.closest('table');
        var $previous = $parentTable.find('thead tr th.sort-me-col');
        var width;
        var sortDesc = true;

        if ($previous.length) {
            $parentTable.find('tbody tr td.sort-me-val').toArray().forEach(function(td) {
                var $td = $(td);
                $td.removeClass('sort-me-val');
                changeBackgroundColor($td, 10);
            });
            width = parseFloat($previous.css('width').replace('px', ''));
            $previous.css('width', width - 14);
            var previousSort = $previous.find('.sort-me-arrow');
            var previousSortDesc = previousSort.data('jsSortdesc');
            previousSort.remove();
            changeBackgroundColor($previous, 10);

            if ($previous.get(0) == $el.get(0) && previousSortDesc) {
                sortDesc = false;
            } else {
                $previous.removeClass('sort-me-col');
                if (!previousSortDesc) return;
            }
        }


        var ind = $el.index();
        var tableRows = $parentTable.find('tbody tr').toArray();
        var invalidSort = false;
        var values = tableRows.map(function (tr) {
            var td = $(tr).find('td')[ind];
            if (!td) {
                invalidSort = true;
                return null;
            }
            return td.innerText;
        });

        if (invalidSort) {
            console.log('jquery.sortme unable to sort table probably due to a td with a colspan');
            return;
        }

        $el.addClass('sort-me-col');
        width = parseFloat($el.css('width').replace('px', ''));
        $el.css('width', width + 14);
        $el.html($el.html() + '<span class="sort-me-arrow" style="float:right" data-js-sortdesc="' + sortDesc + '">' + (sortDesc ? downArrow : upArrow) + '</span>');
        changeBackgroundColor($el, -10);
        
        if (isNumberType(values))
            values = values.map(function (val) { return parseFloat(val) });

        var i = 0;
        var rowVal = [];
        values.forEach(function (val) {
            rowVal.push({ ind: i, val: val });
            i++;
        });

        rowVal.sort(function (a, b) {
            if (a.val > b.val) {
                return sortDesc ? -1 : 1;
            }
            if (a.val < b.val) {
                return sortDesc ? 1 : -1;
            }
            return 0;
        });

        $parentTable.find('tbody tr').remove();
        var $tbody = $parentTable.find('tbody');
        rowVal.forEach(function (rv) {
            $tbody.append(tableRows[rv.ind]);
        });
        $tbody.find('tr td:nth-child(' + (ind + 1) + ')').toArray().forEach(function (td) {
            var $td = $(td);
            $td.addClass('sort-me-val');
            changeBackgroundColor($td, -10);
        });
    };

    var init = function (index, el) {
        $(el).find('th').on('click', function (e) { sort(e); });
    }

    $.fn.sortme = function (opts) {
        $.extend(settings, opts);
        this.each(init);
        return this;
    };

})(jQuery)