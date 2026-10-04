One way of measuring the **unusualness** of a given data point $\vec{x}$ is taking the $\operatorname{L}_2$ norm of the $z$-score vector:

$$
\vec{z} = \frac{\vec{x} - \vec{\pi}_c}{\vec{\sigma}_c}
$$

- $\vec{\pi}_c$ is the mean vector of class $c$, each coordinate being the mean of one of the features/traits
- $\vec{\sigma}_c$ is the standard deviation vector, each coordinate being the standard deviation of one of the features/traits 

Therefore a $z$-score can roughly be thought of as a vector of standardized deviations of different traits from the means. Each deviation/diff. from mean $x_i - \pi_{x_i}$ is compared against the respective standard deviation $\sigma_{x_i}$ by division to measure **how many typical deviations is the value from the mean**.

The problem with measuring **unusualness** this way is the fact that the original features might be **correlated**. For example, if two features have great standardized deviations, but it is known they correlate strongly in their direction, then they contribute great **unusualness** but the fact that it was expected due their great correlation is **not discounted**.

The idea is to instead measure **unusualness** of **transformed features that are uncorrelated**. And in particular: can these **transformed features be linear combinations of the original features**?

**Lemma**

The linear combinations of the standardized deviations of the original features with the eigenvectors of covariance matrix  yield uncorrelated features, and the variances of these new features are the eigenvalues of the cov. mat.:

$$
\operatorname{Cov}(\vec{z}Q)=\Lambda
$$

Where $\Lambda$ is a diagonal matrix, hence transformed traits do not correlate.

**Proof**

The key identity is the following:

$$
\Sigma Q = Q \Lambda
$$

- $\Sigma$ is a matrix, in particular, the covariance matrix of the features in $x$
- $\Lambda$ is a diagonal matrix, in particular, the elements of the diagonal are the eigenvalues of $\Sigma$

$$
\begin{aligned}
\Sigma &=
\begin{bmatrix}
\sigma_{11} & \sigma_{12} & \cdots & \sigma_{1n}\\
\sigma_{21} & \sigma_{22} & \cdots & \sigma_{2n}\\
\vdots      & \vdots      & \ddots & \vdots\\
\sigma_{n1} & \sigma_{n2} & \cdots & \sigma_{nn}
\end{bmatrix}\\
\Lambda &=
\begin{bmatrix}
\lambda_1 &        &        & 0\\
           & \lambda_2 &     &  \\
           &        & \ddots &  \\
0          &        &        & \lambda_n
\end{bmatrix}
\end{aligned}
$$

In general, this is the eigenvalue problem for multiple eigenvectors and eigenvalues.

After multiplication on the right hand side, the matrix $(Q \Lambda)$ will contain the columns vectors of $Q$ each multiplied by one of the constants of $\Lambda$.

$$
\begin{aligned}

Q &=
\begin{bmatrix}
\vphantom{\Large A}\vert & \vphantom{\Large A}\vert & & \vphantom{\Large A}\vert \\
\vec{q_1} & \vec{q_2} & \cdots & \vec{q_n} \\
\vphantom{\Large A}\vert & \vphantom{\Large A}\vert & & \vphantom{\Large A}\vert
\end{bmatrix}\\

Q \Lambda &=
\begin{bmatrix}
\vphantom{\Large A}\vert & \vphantom{\Large A}\vert & & \vphantom{\Large A}\vert \\
\lambda_1 \vec{q_1} & \lambda_2 \vec{q_2} & \cdots & \lambda_n \vec{q_n} \\
\vphantom{\Large A}\vert & \vphantom{\Large A}\vert & & \vphantom{\Large A}\vert
\end{bmatrix}
\end{aligned}
$$

And on the left hand side after multiplication, the resulting column vectors of matrix $(\Sigma Q)$ can each be viewed as column vectors of $Q$, each multiplied by $\Sigma$.

$$
\Sigma Q =
\begin{bmatrix}
\vphantom{\Large A}\vert & \vphantom{\Large A}\vert & & \vphantom{\Large A}\vert \\
\Sigma \vec{q_1} & \Sigma \vec{q_2} & \cdots & \Sigma \vec{q_n} \\
\vphantom{\Large A}\vert & \vphantom{\Large A}\vert & & \vphantom{\Large A}\vert
\end{bmatrix}
$$

Therefore, for $\forall \vec{q_i} \in Q$ and their corresponding constant $ \Lambda_{ii} \in \Lambda $ the following must hold:

$$
\Sigma \vec{q_i} = \vec{q_i} \Lambda_{ii}
$$

Which is the eigenvalue problem for one eigenvector.
From the above identity an important conclusion can be drawn, when $Q$ is invertible.

$$
\begin{aligned}
\Sigma Q &= Q \Lambda\\
\implies Q^{-1}\Sigma Q &= Q^{-1}Q \Lambda = \Lambda
\end{aligned}
$$

$\Sigma$ is a special matrix, because covariance matrices are symmetrical and hence they have exactly $n$ eigenvectors which are orthogonal. **This theorem, for the curious, is proven below, after the derivation of the use of Mahalanobis distance in generative LDA.**

The inverse of square matrices holding orthogonal vectors exist, and it is exactly their transpose:

$$
Q^{-1}=Q^T
$$

The reasoning is trivial. Nondiagonal entries of $(QQ^T)$ are products of different eigenvectors, which are orthogonal, and hence their dot product is zero. While at the diagonal is the square of the Euclidean $(\operatorname{L}_2)$ length/norm of the eigenvector (which is $1$ if they are chosen to be unit vectors):

$$
QQ^T =
\begin{bmatrix}
q_1^Tq_1 & q_1^Tq_2 & \cdots & q_1^Tq_n \\
q_2^Tq_1 & q_2^Tq_2 & \cdots & q_2^Tq_n \\
\vdots   & \vdots   & \ddots & \vdots   \\
q_n^Tq_1 & q_n^Tq_2 & \cdots & q_n^Tq_n
\end{bmatrix}\\

(QQ^T)_{ij} = q_i^Tq_j =
\begin{cases}
0, & i \ne j
\quad\\[4pt]
\lVert q_i\rVert_2^2, & i=j
\quad
\end{cases}\\
QQ^T =
\begin{bmatrix}
\underbrace{q_1^Tq_1}_{\lVert q_1\rVert_2^2=1}
&
\underbrace{q_1^Tq_2}_{=0}
&
\cdots
&
\underbrace{q_1^Tq_n}_{=0}
\\
\underbrace{q_2^Tq_1}_{=0}
&
\underbrace{q_2^Tq_2}_{\lVert q_2\rVert_2^2=1}
&
\cdots
&
\underbrace{q_2^Tq_n}_{=0}
\\
\vdots & \vdots & \ddots & \vdots
\\
\underbrace{q_n^Tq_1}_{=0}
&
\underbrace{q_n^Tq_2}_{=0}
&
\cdots
&
\underbrace{q_n^Tq_n}_{\lVert q_n\rVert_2^2=1}
\end{bmatrix}
$$

$$
\begin{aligned}
&\Sigma Q = Q \Lambda\\
\implies &\boxed{Q^{-1}\Sigma Q = Q^{T}\Sigma Q = \Lambda}
\end{aligned}
$$

This result is important because the $z$-score transformation by matrix $Q$ yields:

$$
\begin{aligned}
\operatorname{Cov}(zQ)
&=
\mathbb{E}\left[
\left(zQ-\mathbb{E}[zQ]\right)^T
\left(zQ-\mathbb{E}[zQ]\right)
\right]\\
\operatorname{Cov}(zQ)
&=
\mathbb{E}\left[
\left(zQ-\mathbb{E}[zQ]\right)^T
\left(zQ-\mathbb{E}[zQ]\right)
\right]
\\[4pt]
&=
\mathbb{E}\left[
\left(Q^Tz^T-Q^T\mathbb{E}[z]^T\right)
\left(zQ-\mathbb{E}[z]Q\right)
\right]
\\[4pt]
&=
\mathbb{E}\left[
Q^T
\left(z-\mathbb{E}[z]\right)^T
\left(z-\mathbb{E}[z]\right)
Q
\right]
\\[4pt]
&=
Q^T
\mathbb{E}\left[
\left(z-\mathbb{E}[z]\right)^T
\left(z-\mathbb{E}[z]\right)
\right]
Q
\\[4pt]
&=
Q^T\operatorname{Cov}(z)Q\\
&= \boxed{Q^T \Sigma Q}\\
\xrightarrow{
    \substack{
        \Sigma\ \text{is symmetric}\\
        Q\ \text{is orthonormal eigenbasis of}\ \Sigma
    }
} &= \Lambda
\end{aligned}
$$

Therefore, the transformed data has diagonal covariance matrix, hence the new features, formed by linear combinations of the original features are **uncorrelated**. So the idea is, instead of measuring unusualness of original data, instead, **measure unusualness of the transformed data which is uncorrelated**, by calculating the L2 norm of $\vec{z}Q$ which is:

$$
\operatorname{L}_2(\vec{z}Q) =\sqrt{ \sum_{i=1}^{n} \left(\frac{z_i \vec{q_i}}{\lambda_i}\right)^2}
$$

If eigenvectors of $Q$ are chosen to be unit vectors, then $Q$ is a rotational matrix, that is, it preserves Euclidean properties but it is important to note **it is not in fact required to measure Mahalanobis distance**. The eigenvectors can have arbitrary $L_2$ lengths but then the variances in the diagonal of $\Lambda$ are scaled by the respective squares of the $L_2$ lengths of their corresponding eigenvectors, and hence the Mahalanobis distance needs to be adjusted as:

$$
\begin{aligned}
\operatorname{L}_2(\vec{z}Q) &=\sqrt{ \sum_{i=1}^{n} \left(\frac{z_i \hat{q_i}\lVert \vec{q_i} \rVert_2^2}{\Lambda_{ii}}\right)^2}\\
\Lambda_{ii} &= \lVert \vec{q_i} \rVert_2^2 \lambda_i
\end{aligned}
$$

In generative LDA, the Mahalanobis distance is exponentially weighted to measure the probability of the data point $x$ belonging to a class $c$.

Formally, assuming data has normal distribution:

$$

\operatorname{p}(\vec{x}\mid c)
=
\frac{1}{(2\pi)^{n/2}\mid\Sigma\mid^{1/2}}
\exp\left(
-\frac12
(\vec{x}-\vec{\mu}_c)^T
\Sigma^{-1}
(\vec{x}-\vec{\mu}_c)
\right).
$$

Where $
(\vec{x}-\vec{\mu}_c)^T
\Sigma^{-1}
(\vec{x}-\vec{\mu}_c)$ is the Mahalanobis distance.

#Auxiliary

**Theorem**

A symmetric matrix $A^{nn}$ has exactly $n$ orthogonal eigenvectors.

**Proof**

**Lemma**

A symmetrical matrix $A^{nn}$ has at least one eigenvector.

**Proof**

Consider the following multi-variable functions:

$$
\begin{aligned}
f(\vec{x}) &= \vec{x}^TA\vec{x}\\
g(\vec{x}) &= \vec{x}^T\vec{x} = 1
\end{aligned}
$$

Where
- $g$ in its explicit form is a **constraint function**
- $g$ in its implicit form is a **constraint equation**
- The set $S$ for which the **constraint equation** holds true is the **constraint set/level set**:

$$
S=\{\vec{x}∈\mathbb{R}^n : \vec{x}^T\vec{x}=1\}
$$

By the **Topoligical Extreme Value Theorem**:

- If $S$ is a compact (closed and bounded) non-empty topoligical space, here in particular a non-empty metric space such as a subset of $\mathbb{R}^n$
- If $f: S \to \mathbb{R}$ is continuous (everywhere)

Then $f$, whose domain is constrained to unit vectors, evidently satisfies these criterions and hence attains its maximum at some point $\vec{s} \in S$.

**T-EVT will be proven in a later version of the article**

Since $\vec{s}$ is an extremum of the constrained domain version of $f$, its gradient $\nabla f$ with respect to its coordinate variables of $\vec{x}$ is equal to zero. The problem is, the original definition of $f$ is insensitive of the constraint, and so is its derivative.

Precisely, the gradient inherently considers small perturbations in every coordinate direction around the point. Therefore, when differentiating $f$ as a function defined on the ambient space, it (most probably) takes into account how $f$ changes toward points both inside and outside a given constraint set.

$$
\nabla f(\vec{s}) =
\begin{pmatrix}
\frac{\partial}{\partial x_1} f\\
\vdots\\
\frac{\partial}{\partial x_n} f
\end{pmatrix}\\
\frac{\partial}{\partial x_i} f(\vec{s}) = 
\lim_{h\to 0}
\frac{f(\vec{x}+h\vec{e}_i)-f(\vec{x})}{h}.
$$

Where $\vec{e}_i$ is the unit vector in which $e_i=1$ and all other coordinates are zero. This means for the calculation of the $i$th partial derivative at a point $\vec{s}$ involves taking into account vector points that have their $i$th coordinates in a small neighborhood of the $i$th coordinate of $\vec{s}$.

If for each coordinate there existed a small interval around the respective coordinate of the analyzed point so that arbitrary perturbations to just that one coordinate up to the boundaries of that interval keeps us inside the **constraint set**, then the gradient numerically coincides with a truly constrained version of the function:


$$
\begin{aligned}
&\forall i\in\{1,\ldots,n\},\quad
\exists\,\varepsilon_i>0
\quad\text{such that}\\
&\vec{s}+h\vec{e}_i\in S
\quad\forall h\in(-\varepsilon_i,\varepsilon_i).
\\
\Longrightarrow&
\boxed{\nabla f(\vec{s})=\nabla(f|_S)(\vec{s})}
\end{aligned}
$$

This is of course highly unlikely, so we want to derive a new function which is truly constrained.

The **implicit function theorem** indirectly proves the existence of one-variable, vector-valued parametrized curve functions $\vec{x}(t)$ whose range/value set is a **level (sub)set** satisfying an **implicit function/constraint equation** locally around some point of the **explicit constraint function**.

That means, $\exists I$ open interval, so for $\forall t \in I$ the domain of function $f$ can not leave the **constraint set** when $f(\vec{x}(t))$ is differentiated with respect to $t$ at some point $t^{*} \in I$ we indeed obtain the zero gradient.

$$
\begin{aligned}
&g(\vec{x}(t)) = g(x_1(t), x_2(t)...,x_n(t))=1\\
\xrightarrow{\frac{d}{dt}\text{const=0}} &\frac{d}{dt} g(\vec{x}(t)) = 0\\
\text{Let } &\vec{s} = \vec{x}(t^*)\\
\implies &\frac{d}{dt} f(\vec{x}(t))\bigg|_{t=t^*} = 0
\end{aligned}
$$


**IFT will be proven in a later version of the article**

It is not hard to construct a differentiable curve function that equals $\vec{s}$ for $\vec{x}(0)$:

$$
\begin{aligned}

\end{aligned}
$$

$$
\begin{aligned}
&\vec{x}(t) = \vec{s} + t\vec{v}\\
\implies &\vec{x}(0)=\vec{s}\\
\implies &\frac{d}{dt} \vec{x}(t) = \lim_{h \to 0} \frac{\vec{s} + h\vec{v} - \vec{s}}{h}=\lim_{h \to 0} \frac {h\vec{v}}{h}=\vec{v}
\end{aligned}
$$

But that generally does not satisfy $f(\vec{x}(t))=\text{const}$ in any **neighborhood** of $t$.

The **implicit function theorem** states:

$$
\begin{aligned}
&\begin{cases}
g \in C^1\\
\exists \frac{\partial}{\partial x_k} g\neq 0
\end{cases}\\
\implies
&\begin{cases}
\exists (U = \prod_{i=1}^{n-1}\ I_i\ \text{open interval}) \subseteq \mathbb{R}^{n-1}\\
\exists (\phi: U \to \mathbb{R}) \in C^1\\
\text{such that: }\\
\forall \vec{v} \in U: \phi(\vec{v})=x_k
\end{cases}
\end{aligned}
$$

In other words, $x_k$ is locally expressible by a (continuously) differentiable function of all the other coordinate variables, provided $g$ is continuously differentiable and has at least one nonzero directional derivative at the point of interest.

Note that the coordinate $x_k$ being expressed may not take on every value of some open interval.

For our particular function $g$:
- It is a polynomial, and hence $\in C^{\infty}$ (infinitely continuously differentiable)
- Its gradient is $\nabla g = 2\vec{x}$ and $\vec{x}^T\vec{x}=1$ and hence the gradient of the explicit unconstrained $g$ can not be null vector at the extremum point of its constrained implicit version

Hence $g$ satisfies the conditions of the **implicit function theorem**.

**NOTE/Lemma**

To demonstrate how the **IFT** can be used to construct and use parametrized curves in proofs, let's prove that the gradient of a function is perpendicular to all tangetial directions at any point $\vec{s}$ of an implicit **constraint equation/level set** derived from that function. ($f(\vec{x})=y \to f(\vec{x})=\text{const}$)

**Proof**

Let $\vec{w}$ be arbitrarily chosen vector perpendicular to $\nabla g(\vec{x})$ at point $\vec{s}$, so $\nabla g(\vec{s}) \vec{w}=0$

If $g$ satisfies the conditions of the **implicit function theorem**, then in some neighborhood $U \subseteq \mathbb{R}^{n-1}$ of $\vec{s}_{-k} \in \mathbb{R}^{n-1}$:

$$
\forall \vec{v}\ \in U:\\
x_k=\phi(\vec{v})
$$

And to construct our one-variable, vector valued parametrized curve function:

$$
\begin{aligned}
x_i(t) &= \vec{s} + \vec{v}t\quad \forall i \neq k\\
x_k(t) &= \phi(x_1,..,x_{k-1},x_{k+1},x_n)\\
\implies &\forall t\ \text{such that}\ \vec{x}_{-k}(t) \in U:\\
&\begin{cases}
 g(\vec{x}(t))=\text{const}\\
 \exists \frac{d}{dt} g(\vec{x}(t))
 \end{cases}\\
\implies &g(\vec{x}(0))=g(\vec{s})
\end{aligned}\\
$$

Consider the derivative of **constraint function** $g$ with respect to $t$, applying the chain rule:

$$
\begin{aligned}
&g(\vec{x}(t))=\text{const}\quad \forall\vec{x}_{-k}(t) \in U\\
\implies &\frac{d}{dt} g(\vec{x}(t))=0\\
\implies &=\nabla g(\vec{x})\bigg|_{\vec{x}=\vec{x}(t)} \cdot \frac{d}{dt}\vec{x}(t)=\nabla g(\vec{x})\bigg|_{\vec{x}=\vec{x}(t)} \cdot \frac{d}{dt}\vec{x}(t)=0\\
\implies &\nabla g(\vec{x})\bigg|_{\vec{x}=\vec{x}(t)} \cdot \frac{d}{dt}\vec{x}(t)=0\bigg|_{t=0} = 0\\
\implies &\left(\frac{d}{dt}\vec{x}(t)\right)_i\bigg|_{t=0}=w_i\quad \forall i\neq k
\end{aligned}
$$

So when $i \neq k$, the $i$th coordinate of $\frac{d}{dt}\vec{x}(t)$ at $t=0$ is the $i$th coordinate of $\vec{w}$. Indeed, the goal is to show the tangential direction is exactly the same as $\vec{w}$ at $t=0$, because $\vec{w}$ is an arbitrarily chosen perpendicular vector (to $\nabla g$), and hence then the lemma would be proven for all possible tangential directions. In order to show:

$$
\vec{w} = \frac{d}{dt}\vec{x}(t)\bigg|_{t=0}
$$

...the only question needing to be answered, is whether the $k$th component of the tangential direction is $w_k$:

$$
\left(\frac{d}{dt}\vec{x}(t)\right)_k\bigg|_{t=0}\stackrel{?}{=}w_k
$$

We know the following:
- It is already known that the gradient vector is perpendicular to the tangential direction $\frac{d}{dt}\vec{x}(t)\bigg|_{t=0}$
- It is already known that the gradient vector is perpendicular to $\vec{w}$

These two equations give us a system of equations to solve for the $k$th coordinate of the tangential direction.

$$
\begin{aligned}
&\begin{cases}
\nabla g(\vec{x})\bigg|_{\vec{x}=\vec{x}(0)=\vec{s}} \frac{d}{dt}\vec{x}(t)\bigg|_{t=0}=0\\
\nabla g(\vec{x})\bigg|_{\vec{x}=\vec{x}(0)=\vec{s}} \vec{w}=0
\end{cases}\\
\xrightarrow{\text{Subtracting 2.}} &\left(\sum_{i \neq k}^{n} \left(\nabla g(\vec{x})\bigg|_{\vec{x}=\vec{s}}\right)_i(w_i - w_i)\right) +\\
&+ \left(\nabla g(\vec{x})\bigg|_{\vec{x}=\vec{s}}\right)_k\left(\left(\frac{d}{dt}\vec{x}(t)\bigg|_{t=0}\right)_k - w_k\right)=0\\
&=\left(\nabla g(\vec{x})\bigg|_{\vec{x}=\vec{s}}\right)_k\left(\left(\frac{d}{dt}\vec{x}(t)\bigg|_{t=0}\right)_k - w_k\right)=0\\
\xrightarrow{\left(\nabla g(\vec{x})\bigg|_{\vec{x}=\vec{s}}\right)_k \neq 0} &\left(\frac{d}{dt}\vec{x}(t)\bigg|_{t=0}\right)_k - w_k=0\\
\implies &\boxed{\left(\frac{d}{dt}\vec{x}(t)\bigg|_{t=0}\right)_k = w_k}\\
\implies &\boxed{\vec{w} = \frac{d}{dt}\vec{x}(t)\bigg|_{t=0}}
\end{aligned}
$$

Now we can proceed with proving the original lemma, now that we know we can construct the said curve function $\vec{x}(t)$ so that it satisfies the **constraint equation** $g$ locally, and is also locally differentiable.

Since $f(\vec{x}(t))$ is guaranteed to have an extremum at $t^{*}=0$, the derivative here, and only here, is guaranteed to be zero. While for $g$, 


Since at $t^*$ both gradient vectors $\nabla g(\vec{x})$ and $\nabla f(\vec{x})$ are perpendicular to $\frac{d}{dt}\vec{x}(t)$, it follows that **they must be parallel, that is, scalar multiples of each other**.
Writing the result with the Lagrange multiplier $\lambda$ yields:

$$
\nabla g(\vec{x})\bigg|_{\vec{x}=t^{*}}=\lambda \nabla f(\vec{x})\bigg|_{\vec{x}=t^{*}}
$$

In our particular case, $\nabla g$ is:

$$
\begin{aligned}
\nabla g &=
\begin{pmatrix}
\frac{\partial g}{\partial x_0} = 2x_0\\
\vdots\\
\frac{\partial g}{\partial x_n} = 2x_n
\end{pmatrix}\\
\implies &\boxed{\nabla g=2\vec{x}}
\end{aligned}
$$

And $\nabla f$ is:

$$
\begin{aligned}
f(\vec{x})
&=x^TAx\\
f(\vec{x})
&=
\sum_{i=1}^n\sum_{j=1}^n a_{ij}x_i x_j\\
\frac{\partial f}{\partial x_k}
&=
\frac{\partial}{\partial x_k}
\left(
\sum_{i,j}a_{ij}x_i x_j
\right).
\end{aligned}
$$

There are two ways \(x_k\) can occur:

$$
i=k
\qquad\text{or}\qquad
j=k.
$$

Therefore,

$$
\frac{\partial}{\partial x_k} f
=
\sum_{j=1}^n a_{kj}x_j
+
\sum_{i=1}^n a_{ik}x_i.
$$

The first sum is exactly the \(k\)-th component of \(Ax\):

$$
(Ax)_k=\sum_{j=1}^n a_{kj}x_j.
$$

The second sum is exactly the \(k\)-th component of \(A^Tx\):

$$
(A^Tx)_k=\sum_{i=1}^n a_{ik}x_i.
$$

Hence

$$
\frac{\partial}{\partial x_k} f
=
(Ax)_k+(A^Tx)_k.
$$

Since this holds for every $k$,

$$
\boxed{\nabla f=Ax+A^Tx}.
$$

If $A$ is symmetric, then $A^T=A$, and therefore

$$
\boxed{\nabla f=2Ax}.
$$

We know both gradients are perpendicular to the same tangential direction at point $\vec{s}$, so the two are parallel:

$$
\begin{aligned}
& 2A\vec{s} = \lambda 2\vec{s}\\
\implies & \boxed{A\vec{s}=\lambda\vec{s}}
\end{aligned}
$$

Which is the eigenvalue problem, and hence $\vec{s}$ not just exists, but is also an eigenvector.

**Q.E.D.**
Any symmetric matrix has at least one eigenvector.

**Lemma**

If we know a symmetric matrix has at least one eigenvector, then it has exactly $n-1$ more eigenvectors, $n$ in total.

**Proof**

The above maximization problem is repeated, but with vectors perpendicular to all other already found.

To further constrain the domain of $f$, $g$ becomes a vector-valued function holding individual constraint equations, for convenience, constrained to **zero**. Let $n$ be the number of orthogonal eigenvectors already found, then the next function $g$ is:

$$
\vec{g}_n(\vec{x}) = 
\begin{pmatrix}
\vec{x}^T\vec{x}-1\\
\vec{v}_1^T\vec{x}\\
\vdots\\
\vec{v}_n^T\vec{x}
\end{pmatrix}
$$

Note the first constraint is the unit vector constraint.

The Jacobian matrix of this function is invertible, and is continuously differentiable, and hence satisfies the **General IFT** and therefore all the output variables are expressible by the input variables locally (to the input variables) to satify all the **constrain equations**.

It would lead to contradiction if there were less than $n$ eigenvectors, because we know that in $\mathbb{R}^n$ every orthogonal basis that can express all the vector space must have exactly $n$ orthogonal vectors. Therefore if we could not extend our collection of less than $n$ orthogonal vectors with one more, that would imply any other vector in $\mathbb{R}^n$ can be expressed with less than $n$ vectors which is not possible. 

**Q.E.D.**
Now we know that any symmetrical matrix has exactly $n$ perpendicular eigenvectors.

The important conclusion here is, however:

