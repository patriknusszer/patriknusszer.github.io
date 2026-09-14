# Short summary

My aim is to introduce linear congruencies, prove basic lemmas, then use those to prove the Euler-Fermat Theorem, and then the core mathematics of RSA itself. This article aims at introducing RSA as a very tame animal that is in fact extremely easy to understand. This article is intended for those who have never seen linear congruencies before, so RSA mathematics are proven down from zero.

# Linear congruencies

Two integers $a, b$ are said to be congruent modulo $m$ if they produce the same remainder when divided by $m$. That means for some $k_0, k_1, r_0, m \in \mathbb{Z}, r_0 < m$ the numbers $a$, $b$ can be expressed as:

$$
\begin{aligned}
& a = k_0m + r_0\\
& b = k_1m + r_0\\
\text{Notation: } &a \equiv b \pmod{m}\\
\text{Notation: } &a \sim b
\end{aligned}
$$

The two entities on the two sides of the congruency can be any numbers that satisfy the equivalence condition (same remainders) under the given modulus. You can think of all numbers producing a given remainder $r$ modulo $m$ as being different representatives of the same equivalence class.

If two elements $a$ and $b$ satisfy some well defined equivalence condition, the relation be formally written as $a \sim b$, but this latter notation depends on the exact definition of the equivalence.

Please note that it is always safe to **add or subtract arbitrary multiples of the modulus** from either side of the congruency, since it does not change their remainders:

$$
\begin{aligned}
& a \equiv b \pmod{m}\\
\iff &a=q_am+r,b+q_bm+r \pmod{m}\\
\iff &q_am + r \equiv q_bm + r \pmod{m}\\
\iff &(q_a \pm K)m + r \equiv q_bm + r \pmod{m}\\
\iff &q_am + r \pm Km \equiv q_bm + r \pmod{m}\\
\iff &a \pm Km \equiv b \pmod{m}
\end{aligned}
$$

Furthermore, it is always safe to add/subtract any two representatives of the **same** remainder equivalence class to/from both sides of the congruency (the congruencies imply each other in both directions):

In **general**:

$$
\begin{aligned}
&\begin{cases}
a + x_a \equiv c + x_b \pmod{m} \\
x_a \equiv x_b \pmod{m}
\end{cases} \\
\iff &
\begin{cases}
a \equiv c \pmod{m}\\
x_a \equiv x_b \pmod{m}
\end{cases}
\end{aligned}
$$

In **particular**, it is always harmless to add/subtract a constant to/from a congruency that holds:

$$
\begin{aligned}
&a \equiv b \pmod{m}\\
\iff &a \pm x \equiv b \pm x \pmod{m}
\end{aligned}
$$

Proof of general lemma in **both** directions:

$$
\newcommand{\rem}[2]{\operatorname{rem}_{#1}\left(#2\right)}

\begin{aligned}
&\begin{cases}
a \equiv b \pmod{m}\\
x_a \equiv x_b \pmod{m}
\end{cases}\\
\iff
&\begin{cases}
a = q_am + r\\
b=q_bm + r\\
x_a=q_{x_a}m + r_x\\
x_b=q_{x_b}m + r_x\\
x_a \equiv x_b \pmod{m}
\end{cases}\\
\iff
&\begin{cases}
r \equiv r \pmod{m}\\
r_x \equiv r_x \pmod{m}\\
\end{cases}\\
\iff &r \pm r_x \equiv r \pm r_x \pmod{m}\\
\iff 
&(q_am + r) \pm (q_{x_a}m + r_x) \equiv (q_bm + r) \pm (q_{x_b}m + r) \pmod{m}\\
\iff &\begin{cases}
a \pm x_a \equiv b \pm x_b \pmod{m}\\
x_a \equiv x_b \pmod{m}
\end{cases}\\
\end{aligned}
$$

This result can be interpreted in ring theory as any representatives of one equivalence class ($a,b$) and any representatives of another equivalence class ($x_a,x_b$) always yield a representative of one given equivalence class ($a \pm x_a, b \pm x_b$). Thus a finite ring could be defined on a set containing elements representing each remainder (equivalence class) and define these operations on them. 

A linear congruency $a \equiv b \pmod{m}$ is equivalent with the difference of the two integers $a - b$ being divisible by the modulus $m$:

$$
\begin{aligned}
&a \equiv b \pmod{m}\\
\iff &m \mid a-b\\
\iff &m \mid b-a
\end{aligned}
$$

Proof in **both** directions:

$$
\begin{aligned}
&a \equiv b \pmod{m}\\
\iff &a = q_am + r_0,b=q_bm+r_0\\
\iff &a - b = (q_a-q_b)m\\
\iff &b - a = (q_b - q_a)m\\
\iff &m \mid a - b\\
\iff &m \mid b - a
\end{aligned}
$$

It is important to note that multiplication is not (without conditions) reversible. Formally:

$$
\begin{aligned}
&\begin{cases}
a \equiv b \pmod{m}\\
x_a \equiv x_b \pmod{m}
\end{cases}\\
\Longrightarrow &x_aa \equiv x_bb \pmod{m} 
\end{aligned}
$$

The proof in this direction:

$$
\begin{aligned}
&\begin{cases}
a \equiv b \pmod{m}\\
x_a \equiv x_b \pmod{m}
\end{cases}\\
\Longrightarrow
&\begin{cases}
a=q_am + r\\
b=q_bm + r\\
x_a=q_{x_a}m + r_x\\
x_b=q_{x_b}m + r_x
\end{cases}\\
\Longrightarrow
&\begin{cases}
ax_a = (q_aq_{x_a} + q_{x_a}r + q_ar + rr_x)m + rr_x\\
bx_b = (q_bq_{x_b} + q_{x_b}r + q_br + rr_x)m + rr_x\\
\end{cases}\\
\Longrightarrow
&\begin{cases}
rr_x + m(...) \equiv rr_x + m(...) \pmod{m}\\
rr_x \equiv rr_x \pmod{m}
\end{cases}\\
\Longrightarrow
&\begin{cases}
rr_x \equiv r \pmod{m}\\
r_x \equiv r_x \pmod{m}
\end{cases}\\
\Longrightarrow
&rr_x \equiv rr_x \pmod{m}

\end{aligned}
$$

Therefore this result can be understood in ring theory as any representatives if some remainder equivalence class $(a, b)$ multiplied by any representative of another remainder equivalence class $(x_a, x_b)$ will yield a representative of one particular remainder equivalence class.

But the other direction is not always true. Remember that the modulus $m$ must always be able to divide the difference of the sides of the congruency:

$$
\begin{aligned}
&ax \equiv bx \pmod{m}\\
\iff &m \mid x(a-b)
\end{aligned}
$$

The danger here to bear in mind is that diving by $x$ or some prime factors of $x$ may be factors that also exist in the modulus $m$, and after they are removed from $x$, the difference $(a-b)$ and the remaining factors of $x$ must still contain all of the factors (with their corresponding multiplicities) of $m$ for the divisibility criterium to hold.

On one part, it is always safe to cancel prime factors from the congruency that $m$ does not contain:

$$
\begin{aligned}
&\begin{cases}
ax \equiv bx \pmod{m}\\
\gcd(x, m)=1
\end{cases}\\
\Longrightarrow &a \equiv b \pmod{m}\\
\end{aligned}
$$

Add from this, it trivially follows (equivalently, bidirectionally):

$$
\begin{aligned}
&\begin{cases}
ax \equiv bx \pmod{m}\\
x = x_f * x_g\\
\gcd(x_f, m)=1
\end{cases}\\
\Longrightarrow &\frac{x}{x_f}a \equiv \frac{x}{x_f}b \pmod{m}\\
\Longrightarrow &x_ga \equiv x_gb \pmod{m}
\end{aligned}
$$

The question rises, what happens if we want to **cancel factors common with the modulus**? Well, if we know that what remains after the cancellation in the difference of the two sides of the congruency, then we can certainly do that.

But is there a surefire, trivial way? Yes, we can just simply **remove these factors from the modulus**:

$$
\begin{aligned}
&\begin{cases}
xa \equiv xb \pmod{m}\\
x \mid m
\end{cases}\\
\Longrightarrow &a \equiv b \pmod{\frac{m}{x}}
\end{aligned}
$$

And from this, the following trivially follows (equivalently, bidirectionally):

$$
\begin{aligned}
&\begin{cases}
xa \equiv xb \pmod{m}\\
\begin{cases}
\gcd(x, m)=x_c\\
x=x_cx_g
\end{cases}\\
\Longrightarrow \gcd(x_g, m)=1 
\end{cases}\\
\Longrightarrow &a \equiv b \pmod{\frac{m}{x_c}}\\
\iff &x_ga \equiv x_gb \pmod{\frac{m}{x_c}}
\end{aligned}
$$

So if we want to cancel some integer, we need to make sure to remove the factors it has in common with the modulus, from the modulus. The factors in that integer that are not common are unconditionally cancellable without the modification of the modulus, although it is not necessary.

# Euler-Fermat Theorem

The theorem I am gonna prove is in fact Euler's Equation. Fermat's Little Theorem is a special case of the former result and also has a slightly different proof which I am not going to show. The statement of the theorem:

$$
\begin{aligned}
& a^{\phi(m)} \equiv 1 \pmod{m}\\
& \gcd(a, m) = 1
\end{aligned}
$$

So given $a$ and $m$ are relative primes (their greatest common divisor is 1) then $a$ raised to the power of the value given by Euler's phi function for $m$ should give a remainder of $1$ for $m$. Let's define the phi function!

Euler's phi function gives the number of all integers larger than $0$ and smaller than $m$ which are relatively prime to $m$. For example:

$$
\phi(10) = 4
$$

Because between $1$ and $9$, the following numbers are relatively prime to $10$: $1, 3, 7, 9$, and there are 4 of them.

Let's introduce residue systems. A set of unordered numbers is said to form a reduced residue system modulo $n$ given the following 3 properties hold:

- There are exactly $\phi(m)$ numbers in the set.

- Second, each of the numbers produce different remainders modulo $m$.

- Third, each of these numbers are relatively prime to $m$.

That being said, the simplest example for an RRS modulo $10$ is ${1, 3, 7, 9}$. Adding multiples of 10 to each will result in another RRS modulo $m$: ${11, 13, 17, 19}$. It is not just these 3 properties that are so much important.

It is important to mention something that might not be immediately evident from the above 3 properties: every RRS modulo $m$ has elements of the same remainder equivalence classes, not simply just different remainder eqivalence classes.

To prove these statements, it is first to be shown that an integer $a$ coprime to $m$ if and only if it has a remainder $r$ also coprime to $m$. Bidirectional proof:

$$
\begin{aligned}
&\begin{cases}
a = mk + r\\
\exists q>1: q \mid r,\,q \mid m \iff \gcd(r,m)>1\\
\end{cases}\\
\iff &a = q(\frac{m}{q}k + \frac{r}{q})\\
\iff
&\begin{cases}
q \mid a\\
\exists q>1: q \mid a,\,q \mid m \iff \gcd(a,m)>1\\
\end{cases} 
\end{aligned}
$$

Therefore an integer is **not coprime** to a modulus if and only if its remainder is **not coprime** to that modulus **either**, and equivalently an integer is **coprime** to a modulus if and only if its remainder is **coprime** to that modulus **as well**.  

This result is enough to show that elements of any RRS modulo $m$ indeed hold the same remainder equivalence classes, which are exactly the coprime remaidners of modulus $m$:

- The elements are coprime, hence they yield not just different, but different coprime remainders
- Every RRS has exactly $\phi(m)$ number of elements, which is exactly the nubmer of all coprime remainders of modulus $m$

Multiplying integers representing each of the remainder classes of a modulus $m$ with an integer coprime to it will yield the same remainders.

$$
\begin{aligned}
&\begin{cases}
xa_i \equiv xa_j \pmod{m}\\
\gcd(x, m)=1
\end{cases}\\
\iff
&\begin{cases}
a_i \equiv a_j \pmod{\frac{m}{\gcd(x,m)=1}}\\
\gcd(x,m)=1
\end{cases}
\end{aligned}
$$


As per the above reasoning, an two integers produce the same remaidner modulo $m$ if and only if their multiples with an integer coprime to the modulus produce the same remainders modulo $m$ Equivalently two integers produce different remainders modulo $m$ if and only if their multiples with an integer coprime to the modulus produce different remainders modulo m.

At this point two fatcs are known:
- multiplying representatives of different remainder classes with an integer coprime to the modulus yields representatives of different remainder classes
- the representatives of the coprime remainders yield back coprime remainder representatives

As a result, we can conclude, as a fun fact, that the representatives of such remainders that have common (prime) factors with the modulus yield representatives of remainders that also have common (prime) factors with the modulus. 

Wrapping up the main proof, let's consider any RRS modulo $m$, and let the constituent numbers be $a_0$, $a_1$, .., $a_{\phi(m)-1}$, and let any $c$ be relatively prime to $m$. Then, as per the previous conclusions, for every $a_i$ there is ought to be a $ca_j$ for which it is true that:

$$
a_i \equiv ca_j \pmod{m}
$$

So basically any number from the RRS can be paired up with another one which will produce the same remainder after multiplied by $c$. For all these pairs this above congruency holds true, and there's exactly $\phi(m)$ of these. As a result of the multiplication rule for linear congruencies, all these congruencies can be "multiplied together" and the product on both sides shall produce the same remainder modulo $m$ for each factor on side having a pair factor on the other producing the same remainder:

$$
a_0a_1a_2... \equiv ca_0ca_1ca_2... \pmod{m}
$$

Then you can collect all the $c$ factors on the right hand side and, big surprise, you will find that there is exactly $\phi(m)$ of it. So after rearrangement:

$$
a_0a_1a_2... \equiv c^{\phi(m)}a_0a_1a_2... \pmod{m}
$$

Now you see, $a_0a_1a_2...$ product is relatively prime to $m$, for each of its factors being relatively prime to $m$. In accordance with our lemma for equivalent division for linear congruencies, we can safely divide both sides by this factor without having to change the modulus, and thus we obtain:

$$
1 \equiv c^{\phi(m)} \pmod{m}
$$

# RSA Cryptography

Diffie-Hellman public key exchange protocol is the predecessor of RSA. It is a technic also based on linear crongruency equivalencies.

But it only served the purpose of agreeing upon a common cryptographic key through a public, vulnerable channel.

Then once everyone knows the key, they can use their symmetric cryptographic algorithm with it. RSA is different from it. It is an cryptographic algorithm itself,

while it is as safe on public channels. (That is, until the era of quantum computers sets in eventually). Every participant has a private and public key.

The public key is that one which is safe to be shared on the vulnerable channel. The public key can be used to encrypt a message with it,

and then the person who receives the message can decrypt it using his/her private key. We are about to find out how that is exactly possible.

All the mathematics behind RSA, knowing the lemmas above, can be concluded in nothing more than a few lines of linear congruencies.

The key is in the proving of the following:

$$
\begin{aligned}
& x^{k\phi(N) + 1} \equiv x \pmod{N}\\
& N = pq
\end{aligned}
$$

$p$ and $q$ are 300-digit prime numbers. The efficacy of RSA lies in the fact that pre-quantum computers can not effectively find out the prime factors of $N$.

Now consider the case, when $x$ happens to be relatively prime with $N$. In that case we are done with the proof, since this congruency is easily derived from the Euler-Fermat theorem.

below we use the multiplication rule for linear congruencies, we just multiply by the same linear congruency:

$$
\begin{aligned}
& a \equiv x \pmod{N}\\
& a \equiv x \pmod{N}\\
& \implies a^2 \equiv x^2 \pmod{N}
\end{aligned}
$$

$$
\begin{aligned}
& x^{\phi(N)} \equiv 1 \pmod{N}\\
& x^{k\phi(N)} \equiv 1^k \pmod{N}\\
& x^{k\phi(N)} \equiv 1 \pmod{N}\\
& x^{k\phi(N) + 1} \equiv x \pmod{N}
\end{aligned}
$$

So there we go actually. We only need to do some more proving in case $x$ is assumed not to be relatively prime to $N$.

Let's look at one other, very trivial case, when $x$ happens to be divisible by both $p$ and $q$. In that case, since $N$ in this case is a divisor of $x$:

$$
\begin{aligned}
& x \equiv 0 \pmod{N}\\
& x^{k\phi(N)} \equiv 0^k \pmod{N}\\
& x^{k\phi(N)} \equiv 0 \pmod{N}\\
& x^{k\phi(N) + 1} \equiv 0 \pmod{N}\\
& \implies x^{k\phi(N) + 1} \equiv x \pmod{N}
\end{aligned}
$$

Isn't it EZ? We are left with one more case. What if $x$ is only divisible by either $p$ or $q$?

Let's assume so, that, for example, $p \nmid x$ but $q \mid x$. Due to Euler-Fermat Theorem:

$$
\begin{aligned}
& x^{\phi(p)} \equiv 1 \pmod{p}\\
& x^{k\phi(q)\phi(p)} \equiv 1^k \pmod{p}\\
& x^{k\phi(q)\phi(p)} \equiv 1 \pmod{p}\\
& \implies x^{k\phi(N)} \equiv 1 \pmod{p}
\end{aligned}
$$

In the last step, we have done a transformation based on an identity: $\phi(N) = \phi(pq)=\phi(p)\phi(q)$.

I am going to prove it now. It is important that $p$ and $q$ are relatively prime. In generality, they are not even required to be primes, only relative primes, that is, they may be compound but should not have common factors.

Now, if we wish to count all the numbers relatively prime to $N$ below $N$, it is the same task, by commonsense, as if we were to count those that are relatively prime to $p$ and $q$, below $N$. Now, imagine a table-like resolution of all the numbers from 1 until $N$. We have $p$ number of columns, and $q$ number of rows. In the first row, you get to see the first $p$ integers, in the second the next $p$ integers from $p + 1$ to $2p$. Let $i$ denote the number of a row, and $j$ denote the number of a column. Then we gain the following resolution for a number $a$ at row $i$ and column $j$:

$$
a_{i,j} = p(i - 1) + j
$$

And now we wish to prove that in this table, we have $\phi(p)\phi(q)$ numbers that are relatively primes to $N$, or equivalently, relatively primes to both $q$ and $p$. We first show that only those numbers fit this criterion, whose column numbers happen to be relatively prime to $p$. By commonsense:

$$
p(i - 1) + j \equiv j \pmod{p}
$$

Now, here, we what we need to prove that, if two entities are congruent modulo $m$, then both of these numbers must have the same greatest common divisor with $m$.

$$
\begin{aligned}
& a \equiv b \pmod{p}\\
& d = (a, m)\\
& \implies d \mid a\\
& \implies m \mid a - b\\
& \implies d \mid a - b\\
& \implies d \mid a - (a - b)\\
& \implies d \mid b
\end{aligned}
$$

The line just above, the main result is due to the fact that the difference of 2 numbers divisible by some other number must also be divisible by it.

Now this result has an important implication: for linear congruency to hold true, the two congruent numbers must have the same greatest common divisor with the modulus.

Now, what this means for us is:

$$
\begin{aligned}
& p(i - 1) + j \equiv j \pmod{p}\\
& \implies (j, p) = (p(i - 1) + j) = 1
\end{aligned}
$$

This effectively means that our number $a_{i,j}$ must be relative prime to $p$, given the column number $j$ is relatively prime to $j$.

And we have, all in all, $\phi(p)$ such columns. We need to show that in each such column we have $\phi(q)$ numbers that are relative primes of $q$.

We show that in each column, none of the numbers are congruent pairwise. This means each number in the column is ought to have a unique remainder modulo $q$.

We prove it indirectly. Let's assume two randomly selected elements in the same column produce the same remainder. For that we make the column number fix.

$$
\begin{aligned}
& p(i_0 - 1) + j \equiv p(i_1 - 1) + j \pmod{q}\\
& p(i_0 - 1) \equiv p(i_1 - 1) \pmod{q}\\
& i_0 - 1 \equiv i_1 - 1 \pmod{q}\\
& i_0 \equiv i_1 \pmod{q}
\end{aligned}
$$

First we subtracted $j$ from both sides, we can do that because $j \equiv j \pmod{q}$.

Then, we divided by $p$, and we could do that without altering the modulus, since $(p, q) = 1$.

Then, we added 1 to both sides.

Eventually, we came to the conclusion, that the row numbers shall be congruent modulo $q$.

That is of course contradiction, since each of the row numbers are between $1$ and $q$.

Therefore, each of the row numbers represent one of the remainders of $q$, and each one occurs only once.

That means, each number in our column is required to produce a unique remainder modulo $q$.

Therefore, we have $\phi(p)$ columns in which we have numbers that matter,

and in each such column, since no two can produce the same remainder modulo $q$, there must be exactly $\phi(q)$

numbers that are congruent not just to $p$, but also to $q$.

Hence,

$$
\phi(q, p)=\phi(q)\phi(p)
$$

So we proceed with the congruency:

$$
\begin{aligned}
& x^{k\phi(N)} \equiv 1 \pmod{p}\\
& x^{k\phi(N) + 1} \equiv x \pmod{p}\\
& \implies p \mid x^{k\phi(N) + 1} - x\\
& q \mid x\\
& \implies q \mid x^{k\phi(N) + 1} - x\\
& \implies pq \mid x^{k\phi(N) + 1} - x\\
& \implies N \mid x^{k\phi(N) + 1} - x
\end{aligned}
$$

So what we can see here, is that since $q$ divides $x$, it must also divide the difference of $x$ given any power of it.

But then if both $p$ and $q$ divides this difference, $N$ should as well. This leads us to the final result:

$$
x^{k\phi(N) + 1} \equiv x \pmod{N}
$$

Ok so, we have shown that this congruency holds true for any value of $x$.

The only question is, how could we use it for cryptography?

We need a public key $a$, and private key $b$. We need a cryptographic function such that:

$$
x^a \equiv c \pmod{N}
$$

Here $c$ is your ciphertext, resulting from public key $a$ and plaintext $x$.

$x$ is your message that you are encrypting.

Now we need such a private key $b$, for which:

$$
\begin{aligned}
& (x^a)^b \equiv c \pmod{N}\\
& x^{ab} \equiv x \pmod{N}
\end{aligned}
$$

Now, due to the above result, for this to hold true:

$$
\begin{aligned}
& ab = k\phi(N)+1\\
& \implies ab \equiv 1 \pmod{\phi(N)}
\end{aligned}
$$

That means, any key combination of $a$ and $b$ will be good, given this congruency holds true for them.

There is a very easy, effective way of calculating a pair for a given key.

A clever way of using Euclidean's algorithm will effectively calculate a key pair.

Please note that in order to even have a chance to find a solution, given key $a$ is given, and $b$ is to be calculated, it is essential that $(a, \phi(N))=1$. That is because, as we have shown it, if $a \equiv b \pmod{m}$ then $(a, m)=(b, m)$.

And here, $(1, \phi(N))=1$, therefore $a$ must also be relative prime to $\phi(N)$.

But this is also the reason why Euclidean's algorithm can be used, since it ensures that we gain a greatest common divisor of $1$.

You need to write another linear congruency beside this one:

$$
\begin{aligned}
& ab = k\phi(N)+1\\
& \phi(N)b \equiv 0 \pmod{\phi(N)}
\end{aligned}
$$

Now you perform Euclidean's algorithm on the numbers on the left hand side, and the ones on the right hand side, in parallel.

Remember that $b$ is the only unknown here.

The fact that $(ab, \phi(N))=1$ is the thing that guarantees that eventually end up with a linear congruency such that $1b \equiv c \pmod{N}$,

where $c$ is a constant, the resulting key.
