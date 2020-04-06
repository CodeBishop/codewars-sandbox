const kcuf = require('./brainfck-transpiler')



const Check = (RawCode,Input = '',Expect = '',Message = '') =>
{
	console.log(RawCode.replace(RegExp(`^${(RawCode.match(/^[ \t]+/m)||[''])[0]}`,'mg'),''))
	console.log(`<b>Input :</b> [${[...Input].map(V => V.charCodeAt())}]`)
	console.log(`<b>Expected output :</b> [${[...Expect].map(V => V.charCodeAt())}]`)
	var Code = kcuf(RawCode)
	console.log(`<b>Output code length :</b> ` + Code.length)
	Test.assertEquals(Execute(Code,Input),Expect,Message)
}

Test.describe('Fixed Tests',() =>
{
	Test.it('Works for var, read, msg, comment',() =>
	{
		Check(`
		var X//This is a comment
		read X--This is also a comment
		msg "Bye" X#No doubt it is a comment
		rem &&Some comment~!@#$":<
		`,'?','Bye?')
	})
	Test.it('Works for set, inc, dec',() =>
	{
		Check(`
		var A B
		sEt A 'a'
		msg a B
		set B 50
		msG A b
		inc A 10
		dec B -20
		msg A B
		`,'','a\0a2kF')
	})
	Test.it('Works for kinds of numbers',() =>
	{
		Check(`
		var X
		set X  114514
		msg X
		set X -114514
		msg X
		set X 'X'
		msg X
		`,'','\x52\xae\x58')
	})
	Test.it('Works for add, sub, mul',() =>
	{
		Check(`
		var A B C
		read A
		read B
		add a b c
		msg a b c
		sub a b a
		msg a b c
		mul b a c
		msg a b c
		`,'0\x07','\x30\x07\x37\x29\x07\x37\x29\x07\x1f')
	})
	Test.it('Works for divmod, div, mod',() =>
	{
		Check(`
		var A B C D
		set A 79
		set B 13
		divmod A B C D
		msg A B C D
		div C D C
		msg A B C D
		mod A D A
		msg A B C D
		`,'','\x4f\x0d\x06\x01\x4f\x0d\x06\x01\x00\x0d\x06\x01')
	})
	Test.it('Works for cmp',() =>
	{
		Check(`
		var X K
		read X
		cmp 80 X K
		msg X K
		cmp X 'z' K
		msg X K
		cmp X X K
		msg X K
		`,'\x80','\x80\xff\x80\x01\x80\x00')
	})
	Test.it('Works for a2b, b2a',() =>
	{
		Check(`
		var A B C D
		set a 247
		b2a A B C D
		msg A B C D
		inc B 1
		dec C 2
		inc D 5
		a2b B C D A
		msg A B C D // A = (100 * (2 + 1) + 10 * (4 - 2) + (7 + 5)) % 256 = 76 = 0x4c
		`,'','\xf7\x32\x34\x37\x4c\x33\x32\x3c')
	})
	Test.it('Works for lset, lget',() =>
	{
		Check(`
		var L  [ 20 ]  I X
		lset L 10 80
		set X 20
		lset L 5 X
		set X 9
		lset L X X
		set I 4
		lget L I X
		msg X
		lget L 5 X
		msg X
		lget L 9 X
		msg X
		lget L 10 X
		msg X
		lget L 19 X
		msg X
		`,'','\x00\x14\x09\x50\x00')
	})
	Test.it('Works for ifeq, ifneq, wneq',() =>
	{
		Check(`
		var F L[5] X
		set F 0
		add 10 10 X
		wneq F 5
			lset L F X
			inc F 1
			dec X 1
		end
		//L == [20,19,18,17,16]

		wneq F 0
			inc F -1
			lget L F X
			msg X
		end

		set F 10
		wneq F 0
			ifeq F 10
				set F 5
			end
			dec F 1
			lget L F X
			ifneq X 18
				msg F X
			end
		end
		ifeq F 0
			ifneq X 50
				msg ";-)"
			end
		end
		`,'','\x10\x11\x12\x13\x14\x04\x10\x03\x11\x01\x13\x00\x14;-)')
	})
	Test.it('Works for proc',() =>
	{
		Check(`
		var A B T
		set A 'U'
		set B 'V'

		msg"Outer Before : "A B"\\n"
		call swap B A
		msg"Outer After : "A B"\\n"

		proc swap x y
			msg "Inner Before : "x y"\\n"
			set T x
			call say T
			set x y
			set y T
			msg "Inner After : "x y"\\n"
		end
		proc say x
			msg "It is " x " now\\n"
		end
		`,'','Outer Before : UV\n' +
			'Inner Before : VU\n' +
			'It is V now\n' +
			'Inner After : UV\n' +
			'Outer After : VU\n')
	})
})
Test.describe('Invalid Input',() =>
{
	const ErrorWhen = (Desc,Code) =>
	{
		Test.it('Error Type : ' + Desc,() =>
		{
			Test.expectError(Desc,() => Check(Code))
		})
	}
	ErrorWhen('Unknown instructions',`
	var a
	mov a 5
	`)
	ErrorWhen('Arguments for an instruction are too much or not enough',`
	var x
	set x
	`)
	ErrorWhen('Undefined var names',`
	msg x
	`)
	ErrorWhen('Duplicate var names',`
	var Q
	var q[20]
	`)
	ErrorWhen('Define variables inside a procedure',`
	proc nice
		var evil
	end
	`)
	ErrorWhen('Unclosed [] pair',`
	var x[60 Y
	`)
	ErrorWhen('Expect a variable but got something else',`
	var c 20
	set 20 20
	add "what" 'x' c
	// all lines above cause this error respectively
	`)
	ErrorWhen('Expect a variable but got a list',`
	var L[40] X[20]
	LSet L 0 X
	`)
	ErrorWhen('Expect a list but got a variable',`
	var L X
	LGet L 0 X
	`)
	ErrorWhen('Unclosed \'\' pair',`
	var x
	set x 'z
	`)
	ErrorWhen('Unclosed "" pair',`
	msg " nope
	`)
	ErrorWhen('Nested produces',`
	proc a
	proc b
	end
	end
	`)
	ErrorWhen('Duplicate procedure names',`
	proc Q a
	end
	proc Q q
	end
	`)
	ErrorWhen('Duplicate parameter names',`
	proc Q q Q
	end
	`)
	ErrorWhen('End before begining a block',`
	end
	msg " That's end"
	`)
	ErrorWhen('Unclosed blocks',`
	var a
	set a 20
	ifeq a 19
		msg "eq"
	`)
	ErrorWhen('Undefined produce',`
	var Yes
	caLL Say Yes
	`)
	ErrorWhen('The length of arguments does not match the length of parameters',`
	var P Q
	call What P Q
	proc What Is The Answer
		msg "42"
	end
	`)
	ErrorWhen('Recursive call',`
	var A
	set a 20
	call Wrap a
	proc Say x
		msg "It is "x
		call Wrap X
	end
	Proc Wrap X
		call Say x
	eNd
	`)
})
Test.describe('Advanced Tests',() =>
{
	const
	CHR = String.fromCharCode,
	Clamp = Q => (Q = 0 | Q % 256) < 0 ? 256 + Q : Q,
	Edge = [0,1,2,125,126,127,128,129,130,254,255];

	Test.it('Works for divmod',() =>
	{
		Edge.forEach(L => Edge.forEach(R =>
		{
			if (R)
			{
				const
				Div = Clamp(L / R),
				Mod = Clamp(L % R);

				Check(`
				vaR toString __proto__ hasOwnProperty ValueOf
				reAd __protO__
				rEad toStrinG
				diVMod __prOTO__ toStrinG hasOWNProperty valueOf
				msg TOsTrinG __proto__ HasOwnProperty valueOF
				`,CHR(L,R),CHR(R,L,Div,Mod),`${L} \`divmod\` ${R} == (${Div},${Mod})`)
			}
		}))
	})

	Test.it('Works for cmp',() =>
	{
		Edge.forEach(L => Edge.forEach(R =>
		{
			const CMP = Clamp(L < R ? -1 : R < L ? 1 : 0);

			Check(`
			var __defineGetter__  hasOwnProperty __lookupGetter__ __lookupSetter__ propertyIsEnumerable constructor toString toLocaleString valueOf isPrototypeOf
			reAd __defineGetter__
			rEad constructor
			call __PROto__ constructor __defineGetter__
			msg constructor __defineGetter__ valueOf

			proc __proto__ __defineSetter__ constructor
				cmp __defineSetter__ constructor valueOf
			end
			`,CHR(R,L),CHR(L,R,CMP),`${L} \`cmp\` ${R} == ${CMP}`)
		}))
	})
})