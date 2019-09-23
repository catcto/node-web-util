exports.build = function (total, page, pagesize, offset, length) {
    var oldpage = -1;
    var lastpage = Math.ceil(total / pagesize);
    var loopcount = Math.ceil(lastpage / pagesize);
    page = page > lastpage ? 1 : page;
    var previous = parseInt(page) - 1;
    var next = parseInt(page) + 1;
    var isprevious, isnext;
    isnext = next - 1 < lastpage ? true : false;
    isprevious = parseInt(previous) > 0 ? true : false;
    var begin, end, step;
    step = lastpage > length ? length : lastpage;
    if (offset > 0) {
        begin = page <= offset ? 1 : page - offset;
    }
    else if (offset == 0 && page == 1) {
        begin = 1;
    }
    else if (page != 1 && oldpage < page) {
        begin = page < pagesize ? 1 : page;
    }
    else if (page != 1 && oldpage >= page) {
        begin = page < pagesize ? 1 : page - step + 1;
    }
    end = parseInt(begin) + parseInt(step);
    end = end >= lastpage ? lastpage + 1 : end;
    if (end - begin + 1 != step) {
        end = begin + step;
    }
    if (begin + step - 1 > lastpage) {
        begin = lastpage - step + 1;
        end = lastpage + 1;
    }
    var isforward, isback;
    isforward = lastpage - end >= 0 ? true : false;
    isback = begin > 1 ? true : false;
    var forward, back;
    back = begin - 1 <= 0 ? 1 : begin - 1;
    forward = end;
    oldpage = page;
    var pv = {};
    pv.total = total;
    pv.page = parseInt(page);
    pv.pagesize = pagesize;
    pv.lastpage = lastpage;
    pv.loopcount = loopcount;
    pv.previous = previous;
    pv.next = next;
    pv.isprevious = isprevious;
    pv.isnext = isnext;
    pv.begin = begin;
    pv.end = end;
    pv.step = step;
    pv.isforward = isforward;
    pv.isback = isback;
    pv.forward = forward;
    pv.back = back;
    pv.offset = offset;
    pv.length = length;
    return pv;
}