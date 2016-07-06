//app.js
var gameScene = cc.Scene.extend({
    onEnter: function() {
        this._super();
        var backgroundLayer = new cc.LayerColor(new cc.Color(140, 200, 140, 128));
        this.addChild(backgroundLayer);

        gameLayer = new game();
        this.addChild(gameLayer);
    }
});

var console_label;
var game = cc.Layer.extend({
    ctor: function() {
        this._super();

        var gradient = cc.LayerGradient.create(cc.color(241, 223, 238), cc.color(0x46, 0x82, 0xB4, 255));
        this.addChild(gradient);

        for (i = 0; i < 16; i++) {
            //var tile = cc.Sprite.create(res.cover_png);
            var tile = new MemoryTile();
            this.addChild(tile, 0);
            //タイルを格子状に配置する計算式
            tile.setPosition(49 + i % 4 * 74, 400 - Math.floor(i / 4) * 74);
        }
        var size = cc.director.getWinSize();
        console_label = cc.LabelTTF.create("Concentration Game", "Arial", 26);
        console_label.setPosition(size.width / 2, size.height / 6);
        this.addChild(console_label, 1);

        return true;
    },
});

//Spriteクラスを拡張して実装してみた
var MemoryTile = cc.Sprite.extend({
    ctor: function() {
        this._super();
        this.initWithFile(res.cover_png);
        //イベントマネージャにイベントリスナーを追加
        cc.eventManager.addListener(listener.clone(), this);
    },
});

//listnerの宣言
var listener = cc.EventListener.create({
    event: cc.EventListener.TOUCH_ONE_BY_ONE,
    swallowTouches: true,
    onTouchBegan: function(touch, event) {
        var target = event.getCurrentTarget();
        var location = target.convertToNodeSpace(touch.getLocation());
        var targetSize = target.getContentSize();
        var targetRectangle = cc.rect(0, 0, targetSize.width, targetSize.height);

        if (cc.rectContainsPoint(targetRectangle, location)) {
            console.log("I piced a tile!!");
            console_label.setString("I piced a tile!!");
            // 一秒後に消える
            setTimeout(function() {
                console_label.setString("");
            }, 1500);

        }
    }
});
