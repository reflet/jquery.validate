/**
 * jQuery Validation Plugin 1.9.0(拡張)
 */
 
$.extend($.validator.methods, {
	//　全角ひらがな･カタカナのみ
	kana:function(value, element, param) {
		return this.optional(element) || /^([ァ-ヶーぁ-ん]+)$/.test(value);
	},
	//　全角ひらがなのみ
	hiragana:function(value, element, param) {
		return this.optional(element) || /^([ぁ-ん]+)$/.test(value);
	},
	// 全角カタカナのみ
	katakana:function(value, element, param) {
		return this.optional(element) || /^([ァ-ヶー]+)$/.test(value);
	},
	// 半角カタカナのみ
	hankana:function(value, element, param) {
		return this.optional(element) || /^([ｧ-ﾝﾞﾟ]+)$/.test(value);
	},
	// 半角アルファベット（大文字･小文字）のみ
	alpha:function(value, element, param) {
		return this.optional(element) || /^([a-zA-z\s]+)$/.test(value);
	},
	// 半角アルファベット（大文字･小文字）もしくは数字のみ
	alphanum:function(value, element, param) {
		return this.optional(element) || /^([a-zA-Z0-9]+)$/.test(value);
	},
	// 郵便番号（例:012-3456）
	zip:function(value, element, param) {
		return this.optional(element) || /^\d{3}\-\d{4}$/.test(value);
	},
	// 携帯番号（例:010-2345-6789）
	mobile:function(value, element, param) {
		return this.optional(element) || /^0\d0-\d{4}-\d{4}$/.test(value);
	},
	// 電話番号（例:012-345-6789）
	tel:function(value, element, param) {
		return this.optional(element) || /^[0-9-]{12}$/.test(value);
	},
	// 日付(例:2012/01/01, 2012-01-01)
	dateCustom: function(value, element) {
		var ret = false, str;
		if(value == '') return true;
		
		// フォーマットチェック
		if(/^(\d{4})\/(\d{2})\/(\d{2})$/.test(value)) str = '/';    // yyyy/mm/dd
		else if(/^(\d{4})-(\d{2})-(\d{2})$/.test(value)) str = '-'; // yyyy-mm-dd
		if(!str) return false;
		
		// 分割(年・月・日)
		var res = value.split(str);
		// 日付としての妥当性チェック
		var yy = parseInt(res[0], 10);
		var mm = parseInt(res[1], 10);
		var dd = parseInt(res[2], 10);
		// Date関数を通しても値が変わらなければ正常
		var dt = new Date(yy, (mm - 1), dd);
		if(dt == null || dt.getFullYear() != yy || dt.getMonth() + 1 != mm || dt.getDate() != dd) {
			return false;
		}
		return true;
	},
	// 日付の比較(以上) ※入力検証ルールの｢dateCustom:true｣で日付かどうかのチェックを行ってから使うこと！
	dateMore: function(value, element, param) {
		var e1 = $(param).unbind(".validate-dateMore").bind("blur.validate-dateMore", function() {
			$(element).valid();
		});
		var target = e1.val();
		if(!target) return true;
		
		return target >= value;
	},
	// 時間(時・分)(例:00:00)
	time:function(value, element) {
		var ret = false, result = null;
		if(value == '') return true;
		
		result = value.match(/^([0-9]{2}):([0-9]{2})$/);
		if(result != null){
			var h = parseInt(result[1],10);
			var m = parseInt(result[2],10);
			if((0 <= h && h < 24) && (0 <= m && m < 60)){
				ret = true;
			}
		}
		return ret;
	},
	// 時間(時・分・秒)(例:00:00:00)
	timeS:function(value, element) {
		var ret = false, result = null;
		if(value == '') return true;
		
		result = value.match(/^([0-9]{2}):([0-9]{2}):([0-9]{2})$/);
		if(result != null){
			var h = parseInt(result[1],10);
			var m = parseInt(result[2],10);
			var s = parseInt(result[3],10);
			if((0 <= h && h < 24) && (0 <= m && m < 60) && (0 <= s && s < 60)){
				ret = true;
			}
		}
		return ret;
	},
	// 時間の比較(以上) ※入力検証ルールの｢time:true｣で時間かどうかのチェックを行ってから使うこと！
	timeMore: function(value, element, param) {
		var e1 = $(param).unbind(".validate-timeMore").bind("blur.validate-timeMore", function() {
			$(element).valid();
		});
		var target = e1.val();
		if(!target) return true;
		
		return target >= value;
	}
});
