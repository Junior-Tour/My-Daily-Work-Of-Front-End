
let sort = {
    timeRecord(targetSortFunc) {
        let arr = []
        for (let i=1;i<1000;i++) {
            arr[i]=Math.floor(Math.random() * (100 - 1) + 1)
        }
//            console.log(arr)

        let start=Date.now()
        for (let i=0;i<100;i++) {
            targetSortFunc(arr)
        }
        let end = Date.now()
        return (end-start)/100
    },
    bubbleSort(arr) {
        let len = arr.length;
        for (let i = 0; i < len - 1; i++) {
            for (let j = 0; j < len - 1 - i; j++) {
                if (arr[j] > arr[j+1]) {        // 相邻元素两两对比
                    let temp = arr[j+1];        // 元素交换
                    arr[j+1] = arr[j];
                    arr[j] = temp;
                }
            }
        }
        return arr;
    },
    selectionSort(arr) {
        let len = arr.length;
        let minIndex, temp;
        for (let i = 0; i < len - 1; i++) {
            minIndex = i;
            for (let j = i + 1; j < len; j++) {
                if (arr[j] < arr[minIndex]) {     // 寻找最小的数
                    minIndex = j;                 // 将最小数的索引保存
                }
            }
            temp = arr[i];
            arr[i] = arr[minIndex];
            arr[minIndex] = temp;
        }
        return arr;
    },
    insertionSort(arr) {
        let len = arr.length;
        let preIndex, current;
        for (let i = 1; i < len; i++) {
            preIndex = i - 1;
            current = arr[i];
            while(preIndex >= 0 && arr[preIndex] > current) {
                arr[preIndex+1] = arr[preIndex];
                preIndex--;
            }
            arr[preIndex+1] = current;
        }
        return arr;
    },
    shellSort(arr) {
        let len = arr.length,
            temp,
            gap = 1;
        while(gap < len/3) {          //动态定义间隔序列
            gap =gap*3+1;
        }
        for (gap; gap > 0; gap = Math.floor(gap/3)) {
            for (let i = gap; i < len; i++) {
                temp = arr[i];
                let j
                for (j = i-gap; j >= 0 && arr[j] > temp; j-=gap) {
                    arr[j+gap] = arr[j];
                }
                arr[j+gap] = temp;
            }
        }
        return arr;
    },
    mergeSort(arr) {  // 采用自上而下的递归方法
        let len = arr.length;
        if(len < 2) {
            return arr;
        }
        let middle = Math.floor(len / 2),
            left = arr.slice(0, middle),
            right = arr.slice(middle);
        return sort.merge(sort.mergeSort(left), sort.mergeSort(right));
    },
    merge(left, right) {
        let result = [];

        while (left.length && right.length) {
            if (left[0] <= right[0]) {
                result.push(left.shift());
            } else {
                result.push(right.shift());
            }
        }

        while (left.length)
            result.push(left.shift());

        while (right.length)
            result.push(right.shift());

        return result;
    }
}

function quickSort(arr, left, right) {
    var len = arr.length,
        partitionIndex,
        left = typeof left != 'number' ? 0 : left,
        right = typeof right != 'number' ? len - 1 : right;

    if (left < right) {
        partitionIndex = partition(arr, left, right);
        quickSort(arr, left, partitionIndex-1);
        quickSort(arr, partitionIndex+1, right);
    }
    return arr;
}

function partition(arr, left ,right) {     // 分区操作
    var pivot = left,                      // 设定基准值（pivot）
        index = pivot + 1;
    for (var i = index; i <= right; i++) {
        if (arr[i] < arr[pivot]) {
            swap(arr, i, index);
            index++;
        }
    }
    swap(arr, pivot, index - 1);
    return index-1;
}

function swap(arr, i, j) {
    var temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}
function paritition2(arr, low, high) {
    let pivot = arr[low];
    while (low < high) {
        while (low < high && arr[high] > pivot) {
            --high;
        }
        arr[low] = arr[high];
        while (low < high && arr[low] <= pivot) {
            ++low;
        }
        arr[high] = arr[low];
    }
    arr[low] = pivot;
    return low;
}

function quickSort2(arr, low, high) {
    if (low < high) {
        let pivot = paritition2(arr, low, high);
        quickSort2(arr, low, pivot - 1);
        quickSort2(arr, pivot + 1, high);
    }
    return arr;
}


var len;    // 因为声明的多个函数都需要数据长度，所以把len设置成为全局变量

function buildMaxHeap(arr) {   // 建立大顶堆
    len = arr.length;
    for (var i = Math.floor(len/2); i >= 0; i--) {
        heapify(arr, i);
    }
}

function heapify(arr, i) {     // 堆调整
    var left = 2 * i + 1,
        right = 2 * i + 2,
        largest = i;

    if (left < len && arr[left] > arr[largest]) {
        largest = left;
    }

    if (right < len && arr[right] > arr[largest]) {
        largest = right;
    }

    if (largest != i) {
        swap(arr, i, largest);
        heapify(arr, largest);
    }
}

function heapSort(arr) {
    buildMaxHeap(arr);

    for (var i = arr.length-1; i > 0; i--) {
        swap(arr, 0, i);
        len--;
        heapify(arr, 0);
    }
    return arr;
}

function quickSortV2(arr){
    //取基准
    var pointIndex=Math.floor(arr.length/2);
    //数组去除基准元素，并取出其值
    var pointValue=arr.splice(pointIndex,1)[0];
    var left=[],
        right=[];
    for(var i=0,length=arr.length;i<length;i++){
        arr[i]<pointValue?left.push(arr[i]):right.push(arr[i]);
    }
    return quickSort(left).concat([pointValue],quickSort(right));
}

function standardQuickSort(arr) {
    arr.sort(function (prev,next) {
        return prev-next
    })
}

console.log('Bubble sort :',sort.timeRecord(sort.bubbleSort))
console.log('Selection sort :',sort.timeRecord(sort.selectionSort))
//    console.log('Bubble sort :',sort.timeRecord(sort.bubbleSort))
console.log('insertionSort sort :',sort.timeRecord(sort.insertionSort))
console.log('shellSort sort :',sort.timeRecord(sort.shellSort))
console.log('mergeSort sort :',sort.timeRecord(sort.mergeSort))
console.log('quickSort sort :',sort.timeRecord(quickSort))
console.log('quickSortV2 sort :',sort.timeRecord(quickSortV2))
console.log('standardQuickSort sort :',sort.timeRecord(standardQuickSort))
console.log('heapSort sort :',sort.timeRecord(heapSort))
/*很奇怪，在浏览器中，如果冒泡在选择之后进行，就会快很多（从5-6s加速到2-3s）？？？
 * node环境里倒没问题！
 * 浏览器有什么优化吗？*/