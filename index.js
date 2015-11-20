var postcss = require('postcss');

module.exports = postcss.plugin('scrollbars', function scrollbars(options) {
    return function(css) {
        options = options || {};
        css.walkRules(function(rule) {
            rule.walkDecls(function(decl, i) {
                var value = decl.value;
                var property = decl.prop;

                if (property.indexOf('scrollbar') !== -1) {

                    var origRule = decl.parent,
                        ruleSelectorsBase = origRule.selectors,
                        newRuleBase,
                        ruleSelectorsThumb = origRule.selectors,
                        newRuleThumb;

                    // Insert overflow: auto
                    decl.cloneBefore({ prop: 'overflow',  value: 'auto' });

                    // Add the -webkit-scrollbar code
                    ruleSelectorsThumb = ruleSelectorsThumb.map(function(ruleSelector){
                        return ruleSelector + '::-webkit-scrollbar-thumb';
                    }).join(',\n');

                    newRuleThumb = origRule.cloneAfter({
                        selector: ruleSelectorsThumb
                    }).removeAll();

                    newRuleThumb.append('border-radius: 4px; background-color: ' + value + ';');

                    // Add the -webkit-scrollbar-thumb code
                    ruleSelectorsBase = ruleSelectorsBase.map(function(ruleSelector){
                        return ruleSelector + '::-webkit-scrollbar';
                    }).join(',\n');

                    newRuleBase = origRule.cloneAfter({
                        selector: ruleSelectorsBase
                    }).removeAll();

                    newRuleBase.append('width: 7px; -webkit-appearance: none;');

                    // Remove the original declaration
                    decl.remove();
                }
            });
        });
    };
});
