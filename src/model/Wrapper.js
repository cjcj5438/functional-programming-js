class Wrapper {
    constructor(value) {
        this._value = value;
    }

    // map :: (A -> B) -> A -> B
    /*
    * 要访问Wrapper，但是本身并没有get 方法，但是我们可以实现类似R.identity的方法，所以我们就添加了这个方法。用来拿去Wrapper里面的东西
    * 下面是使用方法
    * const wrappedValue = wrap('Get Functional');
    * wrappedValue.map(R.identity); //-> 'Get Functional'
    * 这样也是可以实现get 的方法的
    * */
    map(f) {
        return f(this._value);
    }

    // fmap :: (A -> B) -> Wrapper[A] -> Wrapper[B]
    // 源码注释读解:fmap函数接受一个从A->B的函数，以及一个Wrapper(A) Functor，然后返回包裹着结果的新Functor Wrapper(B)
    /*
    * 但是问题来了。 我们每次伸手map（）方法去那属性，是不是需要一个值保护的方法？
    * 是的 就是 fmap（）
    * 思路是先将值	包裹都容器中，再返回给调用者，
    * fmap 知道函数的上下文，然后运用。拥有这种函数类型 称为函子
    * */
    fmap(f) {
        return new Wrapper(f(this._value));
    }

    toString() {
        return 'Wrapper (' + this._value + ')';
    }
};

// wrap :: A -> Wrapper(A)
const wrap = (val) => new Wrapper(val);

module.exports = {
    wrap: wrap,
    Wrapper: Wrapper
};
