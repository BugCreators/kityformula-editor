(function(){
    var kity = window.kity,
    kf = window.kf,
    i18n = window.i18n,
    ZOOM = .66;
    /**
     * 向量操作符
     */
    var VectorOperator = (function () {
        return kity.createClass("VectorOperator", {
            base: kf.Operator,
            constructor: function () {
                this.callBase("Vector");
            },
            applyOperand: function (operand) {
                operand.scale(ZOOM);
                var width = Math.ceil(operand.getWidth()),
                    padding = 3,
                    arrowWidth = 10;
                // 绘制箭头
                this.addOperatorShape(new kity
                    .Rect(arrowWidth, 1, 0, 0)
                    .fill("black")
                    .rotate(30));
                this.addOperatorShape(new kity
                    .Rect(arrowWidth, 1, 0, 0)
                    .fill("black")
                    .rotate(-30));
                var shape = this.addOperatorShape(new kity.Rect(width, 1).fill("black"));
                shape.rotate(180).translate(width, -7);
                this.parentExpression.expand(padding * 2, padding * 2);
                this.parentExpression.translateElement(padding * 2, padding * 5);
            }
        })
    })()

    /**
     * 向量表达式
     */
    var VectorExpression = (function() {
        return kity.createClass("VectorExpression", {
            base: kf.CompoundExpression,

            constructor: function (operand) {

                this.callBase();
                this.setOperand(operand, 0);
                this.setFlag("Vector");
                this.setOperator(new VectorOperator());
            }
        })
    })()

    kf.VectorExpression = VectorExpression;
    // 扩展解析和逆解析
    kf.Parser.use("latex").expand({
        parse: {
            "vector": {
                name: "vector",
                type: 2,
                handler: function(info, processedStack, unprocessedStack) {
                    var numerator = unprocessedStack.shift();
                    if (numerator === undefined) {
                        throw new Error("Vec: Syntax Error");
                    }
                    info.operand = [ numerator ];
                    delete info.handler;
                    return info;
                },
                sign: false,
                isVirtualGroup: true
            }
        },

        reverse: {
            "vector": function (operands) {
                return "\\vector " + operands[0];
            }
        }
    })

    appendTimeout();

    function appendTimeout() {
        if (window.kfe) {
            append();
        } else [
            setTimeout(function() {
                appendTimeout();
            }, 100)
        ]
    }

    function append() {
        window.kfe.requestService("ui.toolbar.append", {
            type: 1,
            options: {
                button: {
                    label: i18n.localize("向量"),
                    icon: {
                        src: "assets/images/toolbar/btn.png",
                        x: 388,
                        y: 0
                    }
                },
                box: {
                    width: 332,
                    group: [ {
                        title: i18n.localize("向量"),
                        items: [ {
                            title: i18n.localize("向量"),
                            content: [ {
                                item: {
                                    val: "\\vector \\placeholder",
                                    img: "assets/images/toolbar/other.png",
                                    pos: {
                                        x: 3690,
                                        y: 0
                                    },
                                    size: {
                                        width: 56,
                                        height: 75
                                    }
                                }
                            }]
                        } ]
                    } ]
                }
            }
        })
        window.kfe.requestService("ui.toolbar.enable")
    }
})()